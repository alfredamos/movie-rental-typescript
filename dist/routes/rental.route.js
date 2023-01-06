"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rental_validation_middleware_1 = require("../middleware/rental-validation.middleware");
const rental_controller_1 = require("../controllers/rental.controller");
const check_if_authenticated_middleware_1 = require("../middleware/check-if-authenticated.middleware");
const check_if_admin_middleware_1 = require("../middleware/check-if-admin.middleware");
const router = (0, express_1.Router)();
router.route('/')
    .get(check_if_authenticated_middleware_1.checkIfAuthenticated, rental_controller_1.getAllRentals)
    .post(rental_validation_middleware_1.rentalValidationMiddleware, check_if_authenticated_middleware_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, rental_controller_1.createRental);
router.route('/:id')
    .delete(check_if_authenticated_middleware_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, rental_controller_1.deleteRental)
    .get(check_if_authenticated_middleware_1.checkIfAuthenticated, rental_controller_1.getRentalById)
    .patch(rental_validation_middleware_1.rentalValidationMiddleware, check_if_authenticated_middleware_1.checkIfAuthenticated, check_if_admin_middleware_1.checkIfAdmin, rental_controller_1.editRental);
exports.default = router;
