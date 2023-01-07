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
import { checkIfModifyRentalMiddleware } from "../middleware/check-if-modify-rental.middleware";

const router = Router();
 
router.route('/')
    .get(checkIfAuthenticated, getAllRentals)
    .post(rentalValidationMiddleware, checkIfAuthenticated, createRental);

router.route('/:id')
    .delete(checkIfAuthenticated, checkIfModifyRentalMiddleware, deleteRental)
    .get(checkIfAuthenticated, getRentalById)
    .patch(rentalValidationMiddleware, checkIfAuthenticated, checkIfModifyRentalMiddleware, editRental);


export default router;