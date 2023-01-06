import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import catchError from "http-errors";
import { UserType } from "@prisma/client";
import { userResponse } from '../models/user-response.model';

export const checkIfAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req['user'] as userResponse;

    if (user?.userType !== UserType.Admin) {
        throw catchError(StatusCodes.FORBIDDEN, 'The user is not an admin, access denied');
    }

    next();
};