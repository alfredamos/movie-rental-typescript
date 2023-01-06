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
exports.registerUser = exports.loginUser = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: { email, password } } = req;
    const user = yield prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `invalid credentials.`);
    }
    const hashedPassword = user.password;
    const isValidPassword = yield bcrypt.compare(password, hashedPassword);
    if (!isValidPassword) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `invalid credentials.`);
    }
    const token = tokenGenerator(user.id, user.name, user.userType);
    const userResp = {
        id: user.id,
        name: user.name,
        userType: user.userType,
        token: token
    };
    res.status(http_status_codes_1.StatusCodes.OK).json(userResp);
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: newUse } = req;
    const newUser = newUse;
    console.log("In auth-controller : ", { newUser });
    const userExist = yield prisma.user.findUnique({
        where: { email: newUser.email },
    });
    if (userExist) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, `User with email ${newUser.email} already exists.`);
    }
    const hashedPassword = yield bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    const user = yield prisma.user.create({
        data: Object.assign({}, newUser),
    });
    const token = tokenGenerator(user.id, user.name, user.userType);
    const userResp = {
        id: user.id,
        name: user.name,
        userType: user.userType,
        token: token
    };
    res.status(http_status_codes_1.StatusCodes.CREATED).json(userResp);
});
exports.registerUser = registerUser;
function tokenGenerator(id, name, userType) {
    const secret_key = process.env.JSON_TOKEN_KEY;
    return jwt.sign({
        id,
        name,
        userType
    }, secret_key, {
        expiresIn: '1hr'
    });
}
