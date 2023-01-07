import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {rentalValidation} from "../validations/rental.validation";
import {Request, Response, NextFunction} from "express";
import {Rental} from "../models/rental.model";


export const rentalValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {body: rent} = req;
    const rental = rent as Rental;
    
    const {error, value} = rentalValidation(rental);

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