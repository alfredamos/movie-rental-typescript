import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import { userLoginValidation } from "../validations/user-login.validation";
import {Request, Response, NextFunction} from "express";
import {User} from "../models/user.model";


export const userLoginValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {body: use} = req;
    const user = use as User;
    
    const {error, value} = userLoginValidation(user);

    if (error) {
      let errorMessages: string;

      errorMessages = error.details.map((err) => err.message).join(". ");

      next(
        catchError(
          StatusCodes.BAD_REQUEST,
          `${JSON.stringify(errorMessages)} - please provide all values.`
        )
      );
      return;
    }

    next();

    return value;
}