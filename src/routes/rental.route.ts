import { Router } from "express";
import { rentalValidationMiddleware } from "../middleware/rental-validation.middleware";
import {
    createRental,
    deleteRental,
    editRental,
    getAllRentals,
    getRentalById
} from "../controllers/rental.controller";

const router = Router();

router.route('/')
    .get(getAllRentals)
    .post(rentalValidationMiddleware, createRental);

router.route('/:id')
    .delete(deleteRental)
    .get(getRentalById)
    .patch(rentalValidationMiddleware, editRental);


export default router;