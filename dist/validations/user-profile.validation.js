"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const userProfileSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    newPassword: joi_1.default.string().required(),
});
const userProfileValidation = (user) => {
    const { name, email, phone, password, newPassword } = user;
    return userProfileSchema.validate({
        name,
        email,
        phone,
        password,
        newPassword,
    });
};
exports.userProfileValidation = userProfileValidation;
