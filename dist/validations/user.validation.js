"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
const userValidation = (user) => {
    const { name, email, phone, password } = user;
    return userSchema.validate({
        name,
        email,
        phone,
        password
    }, { abortEarly: false });
};
exports.userValidation = userValidation;
