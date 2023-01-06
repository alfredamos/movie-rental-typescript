import Joi from "joi";
import {User} from "../models/user.model";

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().required()

});

export const userValidation = (user: User) => {    
    const {
        name, 
        email, 
        phone, 
        password
    } = user;

    return userSchema.validate({
        name,
        email,
        phone,
        password
    }, {abortEarly: false});
};