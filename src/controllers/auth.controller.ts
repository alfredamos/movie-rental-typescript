import { PrismaClient, UserType } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { UuidTool } from "uuid-tool";

import { User } from "../models/user.model";
import { UserInfo } from "../models/user-info.model";
import { UserChangePassword } from "../models/user-change-password.model";


const prisma = new PrismaClient();


const changePasswordOfUser = async (req: Request, res: Response) => {
  const { body: userChangePwd } = req;

  const userChangePassword = userChangePwd as UserChangePassword;
  const { email, oldPassword, newPassword, confirmPassword } =
    userChangePassword;

  //----> New password must match the confirm password.
  if (newPassword.normalize() !== confirmPassword.normalize()) {
    throw catchError(
      StatusCodes.BAD_REQUEST,
      "new password does not match confirm password."
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw catchError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }

  //----> Retrieve the old password from database
  const hashedPassword = user.password;

  const isValid = await bcrypt.compare(oldPassword, hashedPassword); //----> Compare the old password with the password stored in the database.

  //----> Check the validity of password.
  if (!isValid) {
    throw catchError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }

  //----> Hash the new password.
  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  //----> Store the new password in the database.
  const updatedUser = await prisma.user.update({
    where: { email },
    data: { ...user, password: newHashedPassword },
  });

  //----> Make a user object information.
  const userInfo: UserInfo = {
    id: updatedUser.id,
    name: updatedUser.name,
    userType: updatedUser.userType,
    message: "Password is changed successfully, please login.",
  };

  //----> Send the user information to client.
  res.status(StatusCodes.OK).json(userInfo);
};


const loginUser = async (req: Request, res: Response) => {
  const {
    body: { email, password },
  } = req;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw catchError(StatusCodes.BAD_REQUEST, `invalid credentials.`);
  }

  const hashedPassword = user.password;

  const isValidPassword = await bcrypt.compare(password, hashedPassword);

  if (!isValidPassword) {
    throw catchError(StatusCodes.BAD_REQUEST, `invalid credentials.`);
  }

  const token = await generateJwtWebToken(user.id, user.name, user.userType);

  const userResp: UserInfo = {
    id: user.id,
    name: user.name,
    userType: user.userType,
    token: token,
    message: "Login successfully",
  };

  res.status(StatusCodes.OK).json(userResp);
};

const registerUser = async (req: Request, res: Response) => {
  const { body: newUse } = req;
  const newUser = newUse as User;

  const userExist = await prisma.user.findUnique({
    where: { email: newUser.email },
  });

  if (userExist) {
    throw catchError(
      StatusCodes.BAD_REQUEST,
      `User with email ${newUser.email} already exists.`
    );
  }

  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  newUser.password = hashedPassword;

  const user = await prisma.user.create({
    data: { ...newUser },
  });

  //const token = await generateJwtWebToken(user.id, user.name, user.userType);

  const userResp: UserInfo = {
    id: user.id,
    name: user.name,
    userType: user.userType,
    message: "Signup is successful, please login.",
  };

  res.status(StatusCodes.CREATED).json(userResp);
};


const profileOfUserById = async (req: Request, res: Response) => {
  const { body: userInput } = req;
  const { id } = req.params;
  const user = userInput as User;

  const { email, password, newPassword, id: userId } = user;

  //----> Check for correctness of id.
  let isEqual = UuidTool.compare(id, userId);
  if (!isEqual) {
    throw catchError(StatusCodes.BAD_REQUEST, "Id mismatch");
  }

  //---> Check if user exists already.
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser) {
    throw catchError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }

  //----> Check for the correctness of the user password.
  const isValid = await bcrypt.compare(password, existingUser.password);

  if (!isValid) {
    throw catchError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  } 

  //----> Hash the new password.
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  delete user.newPassword;

  //----> Store the new password in the database.

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { ...user },
  });

  //----> Make a user object information.
  const userInfo: UserInfo = {
    id: updatedUser.id,
    name: updatedUser.name,
    userType: updatedUser.userType,
    message: "Password is changed successfully, please login.",
    
  };

  //----> Send the user information to client.
  res.status(StatusCodes.OK).json(userInfo);
};


const profileOfUser = async (req: Request, res: Response) => {
  const { body: userInput } = req;
  
  const user = userInput as User;

  const { email, password, newPassword } = user;

  //---> Check if user exists already.
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (!existingUser) {
    throw catchError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  }

  //----> Check for the correctness of the user password.
  const isValid = await bcrypt.compare(password, existingUser.password);

  if (!isValid) {
    throw catchError(StatusCodes.BAD_REQUEST, "Invalid credentials");
  } 

  //----> Hash the new password.
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  delete user.newPassword;

  //----> Store the new password in the database.

  const updatedUser = await prisma.user.update({
    where: { email },
    data: { ...user, id: existingUser.id },
  });

  //----> Make a user object information.
  const userInfo: UserInfo = {
    id: updatedUser.id,
    name: updatedUser.name,
    userType: updatedUser.userType,
    message: "Password is changed successfully, please login.",
    
  };

  //----> Send the user information to client.
  res.status(StatusCodes.OK).json(userInfo);
};


async function generateJwtWebToken(
  id: string,
  name: string,
  userType: UserType
) {
  const secret_key = process.env.JSON_TOKEN_KEY!;
  return await jwt.sign(
    {
      id,
      name,
      userType,
    },
    secret_key,
    {
      expiresIn: "1hr",
    }
  );
}

export { changePasswordOfUser, loginUser, profileOfUser, profileOfUserById, registerUser };
