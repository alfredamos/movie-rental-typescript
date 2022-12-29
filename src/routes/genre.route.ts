import { Router } from "express";
import { genreValidationMiddleware } from "../middleware/genre-validation.middleware";
import {
    createGenre,
    deleteGenre,
    editGenre,
    getAllGenres,
    getGenreById
} from "../controllers/genre.controller";

const router = Router();

router.route('/')
    .get(getAllGenres)
    .post(genreValidationMiddleware, createGenre);

router.route('/:id')
    .delete(deleteGenre)
    .get(getGenreById)
    .patch(genreValidationMiddleware, editGenre);


export default router;