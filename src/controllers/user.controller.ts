import {PrismaClient, UserType} from "@prisma/client";
import {Request, Response, } from "express";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import * as bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
import {UuidTool} from "uuid-tool"

import {User} from "../models/user.model";
import { UserInfo } from "../models/user-info.model";


const prisma = new PrismaClient();


const createUser = async (req: Request, res: Response) => {
    const {body: newUse} = req;
    const newUser = newUse as User;

    const userExist = await prisma.user.findUnique({
        where: {email: newUser.email},
    })

    if (userExist) {
        throw catchError(StatusCodes.BAD_REQUEST, `User with email ${newUser.email} already exists.`);
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    const user = await prisma.user.create({
       data: {...newUser},
    });

    const userResp: UserInfo = {
        id: user.id,
        name: user.name,
        userType: user.userType,
    }

    res.status(StatusCodes.CREATED).json(userResp);
}


const deleteUser = async(req: Request, res: Response) => {
    const {id} = req.params;
    
    const user = await prisma.user.findUnique({
       where: {id},
    });

    if (!user){
        throw catchError(StatusCodes.NOT_FOUND, `User with id = ${id} is not found`);
    }

    const deletedUser = await prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        userType: true,
      },
    });

    res.status(StatusCodes.OK).json(deletedUser);
};


const editUser = async(req: Request, res: Response) => {
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

  if (!newPassword) {
    throw catchError(StatusCodes.BAD_REQUEST, "Provide the new password.");
  }

  //----> Hash the new password.
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;

  //----> Store the new password in the database.

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { ...user },
  });

  //----> Generate Json web token.
  const token = await generateJwtWebToken(
    updatedUser.id,
    updatedUser.name,
    updatedUser.userType
  );

  //----> Make a user object information.
  const userInfo: UserInfo = {
    id: updatedUser.id,
    name: updatedUser.name,
    userType: updatedUser.userType,
    token,
  };

  //----> Send the user information to client.
  res.status(StatusCodes.OK).json(userInfo);
};

const getAllUsers = async(req: Request, res: Response) => {
    const users = await prisma.user.findMany({
       select: {
            id: true,
            name: true,
            userType: true,
            userRentals: true,        
       },
    });
    
    res.status(StatusCodes.OK).json(users);
};


const getUserById = async(req: Request, res: Response) => {
    const {id} = req.params;
    
    const user = await prisma.user.findUnique({
       where: {id},
       select: {
            id: true,
            name: true,
            userType: true,
            userRentals: true,        
       },
    });

    if (!user){
        throw catchError(StatusCodes.NOT_FOUND, `User with id = ${id} is not found`);
    }

    res.status(StatusCodes.OK).json(user);
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


export {   
    createUser,
    deleteUser,
    editUser,
    getAllUsers,
    getUserById,   
}
