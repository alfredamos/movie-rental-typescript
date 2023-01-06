"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genre_validation_middleware_1 = require("../middleware/genre-validation.middleware");
const genre_controller_1 = require("../controllers/genre.controller");
const check_if_authenticated_middleware_1 = require("../middleware/check-if-authenticated.middleware");
const check_if_admin_middleware_1 = require("../middleware/check-if-admin.middleware");
const router = (0, express_1.Router)();
router
    .route("/")
    .get(check_if_authenticated_middleware_1.checkIfAuthenticated, genre_controller_1.getAllGenres)
    .post(genre_validation_middleware_1.genreValidationMiddleware, check_if_authenticated_middleware_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, genre_controller_1.createGenre);
router
    .route("/:id")
    .delete(check_if_authenticated_middleware_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, genre_controller_1.deleteGenre)
    .get(check_if_authenticated_middleware_1.checkIfAuthenticated, genre_controller_1.getGenreById)
    .patch(genre_validation_middleware_1.genreValidationMiddleware, check_if_authenticated_middleware_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, genre_controller_1.editGenre);
exports.default = router;
