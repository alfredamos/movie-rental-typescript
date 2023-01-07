"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfAdmin = void 0;
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const client_1 = require("@prisma/client");
const checkIfAdmin = (req, res, next) => {
    const user = req['user'];
    if ((user === null || user === void 0 ? void 0 : user.userType) !== client_1.UserType.Admin) {
        next((0, http_errors_1.default)(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized to perform this task, access denied."));
        return;
    }
    next();
};
exports.checkIfAdmin = checkIfAdmin;
