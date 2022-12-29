import Joi from "joi";
import { Genre } from "../models/genre.model";

const genreSchema = Joi.object({
    name: Joi.string().required()
});

export const genreValidation = (genre: Genre) => {
    const { name } = genre;
    return genreSchema.validate({
        name
    }, {abortEarly: false});
}; 
