import Joi from "joi";
import { User } from "../models/user.model";

const userProfileSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  newPassword: Joi.string().required(),
});

export const userProfileValidation = (user: User) => {
  const { name, email, phone, password, newPassword } = user;

  return userProfileSchema.validate({
    name,
    email,
    phone,
    password,
    newPassword,
  });
};
