"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfAuthenticated = void 0;
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const jwt = __importStar(require("jsonwebtoken"));
const checkIfAuthenticated = (req, res, next) => {
    var _a, _b;
    const authJwtToken = (_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    if (!authJwtToken) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.FORBIDDEN, 'The authentication JWT is not present, access denied.');
    }
    checkJwtValidity(authJwtToken)
        .then(user => {
        req['user'] = user;
        next();
    })
        .catch(err => {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.FORBIDDEN, 'The authentication JWT is not present, access denied.');
    });
};
exports.checkIfAuthenticated = checkIfAuthenticated;
const checkJwtValidity = (authJwtToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield jwt.verify(authJwtToken, process.env.JSON_TOKEN_KEY);
    return user;
});
