"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidationMiddleware = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const user_login_validation_1 = require("../validations/user-login.validation");
const userLoginValidationMiddleware = (req, res, next) => {
    const { body: use } = req;
    const user = use;
    const { error, value } = (0, user_login_validation_1.userLoginValidation)(user);
    if (error) {
        const errorMessage = Object.values(error.details).join('. ');
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `${errorMessage} - please provide all values`);
    }
    next();
    return value;
};
exports.userLoginValidationMiddleware = userLoginValidationMiddleware;
