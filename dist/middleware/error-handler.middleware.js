"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Something went wrong';
    const name = error.name || 'Internal Server Error';
    return res.status(statusCode).json({
        status: 'fail',
        message,
        name
    });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
