import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {genreValidation} from "../validations/genre.validation";
import {Request, Response, NextFunction} from "express";
import {Genre} from "../models/genre.model";


export const genreValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {body: gen} = req;
    const genre = gen as Genre;
    
    const {error, value} = genreValidation(genre);

    if (error){
        const errorMessage = Object.values(error.details).join('. ')

        throw catchError(StatusCodes.BAD_REQUEST, `${errorMessage} - please provide all values`);
    }

    next();

    return value;
}