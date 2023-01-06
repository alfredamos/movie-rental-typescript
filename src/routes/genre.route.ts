import { Router } from "express";
import { genreValidationMiddleware } from "../middleware/genre-validation.middleware";
import {
  createGenre,
  deleteGenre,
  editGenre,
  getAllGenres,
  getGenreById,
} from "../controllers/genre.controller";

import { checkIfAuthenticated } from "../middleware/check-if-authenticated.middleware";
import { checkIfAdmin } from "../middleware/check-if-admin.middleware";

const router = Router();

router
  .route("/")
  .get(checkIfAuthenticated, getAllGenres)
  .post(
    genreValidationMiddleware,
    checkIfAuthenticated,
    checkIfAdmin,
    createGenre
  );

router
  .route("/:id")
  .delete(checkIfAuthenticated, checkIfAdmin, deleteGenre)
  .get(checkIfAuthenticated, getGenreById)
  .patch(genreValidationMiddleware, checkIfAuthenticated, checkIfAdmin, editGenre);

export default router;
