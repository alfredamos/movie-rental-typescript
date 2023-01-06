import { Router } from "express";
import { rentalValidationMiddleware } from "../middleware/rental-validation.middleware";
import {
    createRental,
    deleteRental,
    editRental,
    getAllRentals,
    getRentalById
} from "../controllers/rental.controller";

import { checkIfAuthenticated } from "../middleware/check-if-authenticated.middleware";
import { checkIfAdmin } from "../middleware/check-if-admin.middleware";

const router = Router();
 
router.route('/')
    .get(checkIfAuthenticated, getAllRentals)
    .post(rentalValidationMiddleware, checkIfAuthenticated, checkIfAdmin, createRental);

router.route('/:id')
    .delete(checkIfAuthenticated, checkIfAdmin, deleteRental)
    .get(checkIfAuthenticated, getRentalById)
    .patch(rentalValidationMiddleware, checkIfAuthenticated, checkIfAdmin, editRental);


export default router;