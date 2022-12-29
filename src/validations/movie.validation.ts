import Joi from "joi";
import {Movie} from "../models/movie.model";

const movieSchema = Joi.object({
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required()
});

export const movieValidation = (movie: Movie) => {
    const {
        title, 
        genreId, 
        numberInStock, 
        dailyRentalRate
    } = movie;

    return movieSchema.validate({
        title, 
        genreId, 
        numberInStock, 
        dailyRentalRate
    }, {abortEarly: false});
};