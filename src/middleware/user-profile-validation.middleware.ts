import { StatusCodes } from "http-status-codes";
import { userProfileValidation } from "../validations/user-profile.validation";
import { Request, Response, NextFunction } from "express";
import createdError from "http-errors";
import { User } from "../models/user.model";

export const userProfileValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body: usa } = req;

  const user = usa as User;

  const { error, value } = userProfileValidation(user);

  if (error) {
    let errorMessages: string;

    errorMessages = error.details
      .map((err) => err.message)
      .join(". ");

    next(createdError(
      StatusCodes.BAD_REQUEST,
      `${JSON.stringify(errorMessages)} - please provide all values.`
    ));
    return;
  }

  next();

  return value;
};
