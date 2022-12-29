import Joi from "joi";
import {Rental} from "../models/rental.model";

const rentalSchema = Joi.object({
    movieId: Joi.string().required(),
    userId: Joi.string().required(),
    rentalFee: Joi.number().required()

});

export const rentalValidation = (rental: Rental) => {
    const {
        movieId, 
        userId, 
        rentalFee
    } = rental;

    return rentalSchema.validate({
        movieId,
        userId,
        rentalFee
    }, {abortEarly: false});
};