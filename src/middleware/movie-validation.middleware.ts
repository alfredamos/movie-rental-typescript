import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {movieValidation} from "../validations/movie.validation";
import {Request, Response, NextFunction} from "express";
import {Movie} from "../models/movie.model";


export const movieValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {body: mov} = req;
    const movie = mov as Movie;
    
    const {error, value} = movieValidation(movie);

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