"use strict";
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
exports.getRentalById = exports.getAllRentals = exports.editRental = exports.deleteRental = exports.createRental = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const uuid_tool_1 = require("uuid-tool");
const prisma = new client_1.PrismaClient();
const createRental = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: newRent } = req;
    const newRental = newRent;
    const userId = newRental.userId;
    const user = yield prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `User with id = ${userId} doesn't exist, please select a valid user from the available list of users.`);
    }
    const movieId = newRental.movieId;
    const movie = yield prisma.movie.findUnique({
        where: { id: movieId },
    });
    if (!movie) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Movie with id = ${movieId} doesn't exist, please select a valid user from the available list of movies.`);
    }
    const rental = yield prisma.rental.create({
        data: Object.assign({}, newRental),
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json(rental);
});
exports.createRental = createRental;
const deleteRental = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rental = yield prisma.rental.findUnique({
        where: { id },
    });
    if (!rental) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Rental with id = ${id} is not found`);
    }
    const deletedRental = yield prisma.rental.delete({
        where: { id },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(deletedRental);
});
exports.deleteRental = deleteRental;
const editRental = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: rentToUpdate } = req;
    const rentalToUpdate = rentToUpdate;
    const { id } = req.params;
    let isEqual = uuid_tool_1.UuidTool.compare(id, rentToUpdate.id);
    if (!isEqual) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Id mismatch');
    }
    const userId = rentalToUpdate.userId;
    const user = yield prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `User with id = ${userId} doesn't exist, please select a valid user from the available list of users.`);
    }
    const movieId = rentToUpdate.movieId;
    const movie = yield prisma.movie.findUnique({
        where: { id: movieId },
    });
    if (!movie) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Movie with id = ${movieId} doesn't exist, please select a valid user from the available list of movies.`);
    }
    const rental = yield prisma.rental.findUnique({
        where: { id },
    });
    if (!rental) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Rental with id = ${id} is not found`);
    }
    const updatedRental = yield prisma.rental.update({
        where: { id },
        data: Object.assign({}, rentalToUpdate),
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(updatedRental);
});
exports.editRental = editRental;
const getAllRentals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rentals = yield prisma.rental.findMany({
        include: {
            movie: true,
            user: true,
        }
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(rentals);
});
exports.getAllRentals = getAllRentals;
const getRentalById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const rental = yield prisma.rental.findUnique({
        where: { id },
    });
    if (!rental) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Rental with id = ${id} is not found`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(rental);
});
exports.getRentalById = getRentalById;
