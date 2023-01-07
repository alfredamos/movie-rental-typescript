import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {userValidation} from "../validations/user.validation";
import {Request, Response, NextFunction} from "express";
import {User} from "../models/user.model";


export const userValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {body: use} = req;
    const user = use as User;
    
    const {error, value} = userValidation(user);

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