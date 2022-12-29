import { Router } from "express";
import { movieValidationMiddleware } from "../middleware/movie-validation.middleware";
import {
    createMovie,
    deleteMovie,
    editMovie,
    getAllMovies,
    getMovieById
} from "../controllers/movie.controller";

const router = Router();

router.route('/')
    .get(getAllMovies)
    .post(movieValidationMiddleware, createMovie);

router.route('/:id')
    .delete(deleteMovie)
    .get(getMovieById)
    .patch(movieValidationMiddleware, editMovie);


export default router;