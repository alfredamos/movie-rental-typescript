import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {genreValidation} from "../validations/genre.validation";
import {Request, Response, NextFunction} from "express";
import {Genre} from "../models/genre.model";


export const genreValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {body: gen} = req;
    const genre = gen as Genre;
    
    const {error, value} = genreValidation(genre);

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