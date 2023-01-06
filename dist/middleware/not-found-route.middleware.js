"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundRouteMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const notFoundRouteMiddleware = (req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        status: 'fail',
        message: `Route does not exist on ${req.baseUrl}/${req.url}`,
    });
};
exports.notFoundRouteMiddleware = notFoundRouteMiddleware;
