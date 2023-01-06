"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const genreSchema = joi_1.default.object({
    name: joi_1.default.string().required()
});
const genreValidation = (genre) => {
    const { name } = genre;
    return genreSchema.validate({
        name
    }, { abortEarly: false });
};
exports.genreValidation = genreValidation;
