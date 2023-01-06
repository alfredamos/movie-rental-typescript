import {PrismaClient, UserType} from "@prisma/client";
import {Request, Response, } from "express";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import {User} from "../models/user.model";

const prisma = new PrismaClient();

const loginUser = async (req: Request, res: Response) => {
    const {body: {email, password}} = req;

    const user = await prisma.user.findUnique({
        where: {email},
    })

    if (!user) {
        throw catchError(StatusCodes.BAD_REQUEST, `invalid credentials.`);
    }

    const hashedPassword = user.password;

    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
        throw catchError(StatusCodes.BAD_REQUEST, `invalid credentials.`);
    }

    const token = tokenGenerator(user.id, user.name, user.userType);

    const userResp = {
        id: user.id,
        name: user.name,
        userType: user.userType,
        token: token

    }

    res.status(StatusCodes.OK).json(userResp);

};


const registerUser = async(req: Request, res: Response) => {
    const {body: newUse} = req;
    const newUser = newUse as User;

    console.log("In auth-controller : ",{newUser})

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

    const token = tokenGenerator(user.id, user.name, user.userType);

    const userResp = {
        id: user.id,
        name: user.name,
        userType: user.userType,
        token: token

    }

    res.status(StatusCodes.CREATED).json(userResp);
};


function tokenGenerator (id: string, name: string, userType: UserType){
    const secret_key = process.env.JSON_TOKEN_KEY!;
    return  jwt.sign({
        id,
        name,
        userType
    }, secret_key,{
        expiresIn: '1hr'
    });
}


export {
    loginUser,
    registerUser,
}