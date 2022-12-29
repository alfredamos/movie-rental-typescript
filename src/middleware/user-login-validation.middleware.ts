import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import { userLoginValidation } from "../validations/user-login.validation";
import {Request, Response, NextFunction} from "express";
import {User} from "../models/user.model";


export const userLoginValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {body: use} = req;
    const user = use as User;
    
    const {error, value} = userLoginValidation(user);

    if (error){
        const errorMessage = Object.values(error.details).join('. ')

        throw catchError(StatusCodes.BAD_REQUEST, `${errorMessage} - please provide all values`);
    }

    next();

    return value;
}