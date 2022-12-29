import { Router } from "express";
import { userValidationMiddleware } from "../middleware/user-validation.middleware";
import {
    registerUser,
    deleteUser,
    editUser,
    getAllUsers,
    getUserById
} from "../controllers/user.controller";

const router = Router();

router.route('/')
    .get(getAllUsers)
    .post(userValidationMiddleware, registerUser);

router.route('/:id')
    .delete(deleteUser)
    .get(getUserById)
    .patch(userValidationMiddleware, editUser);


export default router;