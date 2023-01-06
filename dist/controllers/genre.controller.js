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
exports.getGenreById = exports.getAllGenres = exports.editGenre = exports.deleteGenre = exports.createGenre = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const uuid_tool_1 = require("uuid-tool");
const prisma = new client_1.PrismaClient();
const createGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: newGen } = req;
    const newGenre = newGen;
    const genre = yield prisma.genre.create({
        data: Object.assign({}, newGenre),
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json(genre);
});
exports.createGenre = createGenre;
const deleteGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const genre = yield prisma.genre.findUnique({
        where: { id },
    });
    if (!genre) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Genre with id = ${id} is not found`);
    }
    const deletedGenre = yield prisma.genre.delete({
        where: { id },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(deletedGenre);
});
exports.deleteGenre = deleteGenre;
const editGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: genToUpdate } = req;
    const genreToUpdate = genToUpdate;
    const { id } = req.params;
    let isEqual = uuid_tool_1.UuidTool.compare(id, genreToUpdate.id);
    if (!isEqual) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Id mismatch');
    }
    const genre = yield prisma.genre.findUnique({
        where: { id },
    });
    if (!genre) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Genre with id = ${id} is not found`);
    }
    const updatedGenre = yield prisma.genre.update({
        where: { id },
        data: Object.assign({}, genreToUpdate),
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(updatedGenre);
});
exports.editGenre = editGenre;
const getAllGenres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const genres = yield prisma.genre.findMany({
        include: {
            movies: true,
        }
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(genres);
});
exports.getAllGenres = getAllGenres;
const getGenreById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const genre = yield prisma.genre.findUnique({
        where: { id },
        include: {
            movies: true,
        }
    });
    if (!genre) {
        throw (0, http_errors_1.default)(http_status_codes_1.StatusCodes.NOT_FOUND, `Genre with id = ${id} is not found`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(genre);
});
exports.getGenreById = getGenreById;
