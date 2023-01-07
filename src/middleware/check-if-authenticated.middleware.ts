import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import catchError from "http-errors";
import * as jwt from 'jsonwebtoken';

export const checkIfAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const authJwtToken = req?.headers?.authorization?.split(' ')[1];

    if (!authJwtToken){
        next(catchError(StatusCodes.FORBIDDEN, 'The authentication JWT is not present, access denied.'));
        return;
    }

    checkJwtValidity(authJwtToken)
        .then(user => {
            req['user']  = user;

            next();
            return;
        })
        .catch(err => {
            next(
              catchError(
                StatusCodes.FORBIDDEN,
                "The authentication JWT is not present, access denied."
              )
            );
            return;
        });

}


const checkJwtValidity = async (authJwtToken: string) => {
    const user = await jwt.verify(authJwtToken, process.env.JSON_TOKEN_KEY!);

    return user;
}