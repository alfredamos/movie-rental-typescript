"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_validation_middleware_1 = require("../middleware/movie-validation.middleware");
const movie_controller_1 = require("../controllers/movie.controller");
const check_if_authenticated_middleware_1 = require("../middleware/check-if-authenticated.middleware");
const check_if_admin_middleware_1 = require("../middleware/check-if-admin.middleware");
const router = (0, express_1.Router)();
router.route('/')
    .get(check_if_authenticated_middleware_1.checkIfAuthenticated, movie_controller_1.getAllMovies)
    .post(movie_validation_middleware_1.movieValidationMiddleware, check_if_authenticated_middleware_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, movie_controller_1.createMovie);
router.route('/:id')
    .delete(check_if_authenticated_middleware_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, movie_controller_1.deleteMovie)
    .get(check_if_authenticated_middleware_1.checkIfAuthenticated, movie_controller_1.getMovieById)
    .patch(movie_validation_middleware_1.movieValidationMiddleware, check_if_authenticated_middleware_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, movie_controller_1.editMovie);
exports.default = router;
