"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalValidationMiddleware = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const rental_validation_1 = require("../validations/rental.validation");
const rentalValidationMiddleware = (req, res, next) => {
    const { body: rent } = req;
    const rental = rent;
    const { error, value } = (0, rental_validation_1.rentalValidation)(rental);
    if (error) {
        const errorMessage = Object.values(error.details).map(err => err.message).join('. ');
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `${errorMessage} - please provide all values`);
    }
    next();
    return value;
};
exports.rentalValidationMiddleware = rentalValidationMiddleware;
