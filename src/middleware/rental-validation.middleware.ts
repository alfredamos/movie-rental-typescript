import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {rentalValidation} from "../validations/rental.validation";
import {Request, Response, NextFunction} from "express";
import {Rental} from "../models/rental.model";


export const rentalValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {body: rent} = req;
    const rental = rent as Rental;
    
    const {error, value} = rentalValidation(rental);

    if (error){
        const errorMessage = Object.values(error.details).join('. ')

        throw catchError(StatusCodes.BAD_REQUEST, `${errorMessage} - please provide all values`);
    }

    next();

    return value;
}