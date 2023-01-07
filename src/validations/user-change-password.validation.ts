import Joi from "joi";
import {UserChangePassword} from "../models/user-change-password.model";

const userChangePasswordSchema = Joi.object({
  email: Joi.string().email().required().email(),
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});

export const userChangePasswordValidation = (user: UserChangePassword) => {
    const {     
        email,      
        oldPassword,
        newPassword,
        confirmPassword,
    } = user;

    return userChangePasswordSchema.validate(
      {
        email,
        oldPassword,
        newPassword,
        confirmPassword,
      },
      { abortEarly: false }
    );
};