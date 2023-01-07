import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import catchError from "http-errors";
import { PrismaClient } from "@prisma/client";
import { userResponse } from "../models/user-response.model";
import { UuidTool } from "uuid-tool";
import { UserType } from "../models/user-type.model";

const prisma = new PrismaClient();

export const checkIfModifyRentalMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req["user"] as userResponse;

  const { id } = req.params;

  if (!id) {
    next(catchError(StatusCodes.BAD_REQUEST, "Order does not exist."));
    return;
  }

  const rental = await prisma.rental.findUnique({
    where: { id },
  });

  if (!rental) {
    next(catchError(StatusCodes.BAD_REQUEST, "Order does not exist."));
    return;
  }

  const userId = rental?.userId;
  const isValid = UuidTool.compare(user.id, userId);

  if (isValid || user.userType === UserType.Admin) {
    next();
    return;
  }else {   
     next(
       catchError(
         StatusCodes.UNAUTHORIZED,
         "You are not authorized to perform this task, access denied."
       )
     );
     return;
  }

};
