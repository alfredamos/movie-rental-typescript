import {PrismaClient} from "@prisma/client";
import {Request, Response, } from "express";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import {User} from "../models/user.model";

const prisma = new PrismaClient();


const registerUser = async(req: Request, res: Response) => {
    const {body: newUse} = req;
    const newUser = newUse as User;

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    const user = await prisma.user.create({
       data: {...newUser},
    });

    

    res.status(StatusCodes.CREATED).json(user);
};


const deleteUser = async(req: Request, res: Response) => {
    const {id} = req.params;
    
    const user = await prisma.user.findUnique({
       where: {id},
    });

    if (!user){
        throw catchError(StatusCodes.NOT_FOUND, `User with id = ${id} is not found`);
    }

    const deletedUser = await prisma.user.delete({
        where: {id},
    });

    res.status(StatusCodes.OK).json(deletedUser);
};


const editUser = async(req: Request, res: Response) => {
    const {body: useToUpdate} = req;
    const userToUpdate = useToUpdate as User;
    const {id} = req.params;
    
    const user = await prisma.user.findUnique({
       where: {id},
    });

    if (!user){
        throw catchError(StatusCodes.NOT_FOUND, `User with id = ${id} is not found`);
    }

    const updatedUser = await prisma.user.update({
       where: {id},
       data: {...userToUpdate},
    });

    res.status(StatusCodes.OK).json(updatedUser);
};

const getAllUsers = async(req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        include: {
            userRentals: true,
        }
    });

    res.status(StatusCodes.OK).json(users);
};


const getUserById = async(req: Request, res: Response) => {
    const {id} = req.params;
    
    const user = await prisma.user.findUnique({
       where: {id},
       include: {
        userRentals: true,
       }
    });

    if (!user){
        throw catchError(StatusCodes.NOT_FOUND, `User with id = ${id} is not found`);
    }

    res.status(StatusCodes.OK).json(user);
};

export {
    registerUser,
    deleteUser,
    editUser,
    getAllUsers,
    getUserById
}
