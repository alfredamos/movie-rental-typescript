import { StatusCodes } from "http-status-codes";
import {Request, Response, NextFunction} from "express";

export const notFoundRouteMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.NOT_FOUND).json({
        status: 'fail',
        message: `Route does not exist on ${req.baseUrl}/${req.url}`,
    });
};