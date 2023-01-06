"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const rentalSchema = joi_1.default.object({
    movieId: joi_1.default.string().required(),
    userId: joi_1.default.string().required(),
    rentalFee: joi_1.default.number().required()
});
const rentalValidation = (rental) => {
    const { movieId, userId, rentalFee } = rental;
    return rentalSchema.validate({
        movieId,
        userId,
        rentalFee
    }, { abortEarly: false });
};
exports.rentalValidation = rentalValidation;
