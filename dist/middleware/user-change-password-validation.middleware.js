"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userChangePasswordValidationMiddleware = void 0;
const user_change_password_validation_1 = require("./../validations/user-change-password.validation");
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const userChangePasswordValidationMiddleware = (req, res, next) => {
    const { body: userChangePwd } = req;
    const user = userChangePwd;
    const { error, value } = (0, user_change_password_validation_1.userChangePasswordValidation)(user);
    if (error) {
        let errorMessages;
        errorMessages = error.details.map((err) => err.message).join(". ");
        next((0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `${JSON.stringify(errorMessages)} - please provide all values.`));
        return;
    }
    next();
    return value;
};
exports.userChangePasswordValidationMiddleware = userChangePasswordValidationMiddleware;
