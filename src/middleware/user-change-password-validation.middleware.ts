import { userChangePasswordValidation } from "./../validations/user-change-password.validation";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import createdError from "http-errors";
import { UserChangePassword } from "../models/user-change-password.model";

export const userChangePasswordValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body: userChangePwd } = req;

  const user = userChangePwd as UserChangePassword;

  const { error, value } = userChangePasswordValidation(user);

  if (error) {
    let errorMessages: string;

    errorMessages = error.details.map((err) => err.message).join(". ");

    next(
      createdError(
        StatusCodes.BAD_REQUEST,
        `${JSON.stringify(errorMessages)} - please provide all values.`
      )
    );
    return;
  }

  next();

  return value;
};
