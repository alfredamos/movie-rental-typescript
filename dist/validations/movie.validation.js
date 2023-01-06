"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const movieSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    genreId: joi_1.default.string().required(),
    numberInStock: joi_1.default.number().required(),
    dailyRentalRate: joi_1.default.number().required()
});
const movieValidation = (movie) => {
    const { title, genreId, numberInStock, dailyRentalRate } = movie;
    return movieSchema.validate({
        title,
        genreId,
        numberInStock,
        dailyRentalRate
    }, { abortEarly: false });
};
exports.movieValidation = movieValidation;
