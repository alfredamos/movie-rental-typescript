import { Router } from "express";
import { movieValidationMiddleware } from "../middleware/movie-validation.middleware";
import {
    createMovie,
    deleteMovie,
    editMovie,
    getAllMovies,
    getMovieById
} from "../controllers/movie.controller";

import { checkIfAuthenticated } from "../middleware/check-if-authenticated.middleware";
import { checkIfAdmin } from "../middleware/check-if-admin.middleware";

const router = Router();

router.route('/')
    .get(checkIfAuthenticated, getAllMovies)
    .post(movieValidationMiddleware, checkIfAuthenticated, checkIfAdmin, createMovie);

router.route('/:id')
    .delete(checkIfAuthenticated, checkIfAdmin, deleteMovie)
    .get(checkIfAuthenticated, getMovieById)
    .patch(movieValidationMiddleware, checkIfAuthenticated, checkIfAdmin, editMovie);


export default router;