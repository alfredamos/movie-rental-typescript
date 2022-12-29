import { Router } from "express";
import { userValidationMiddleware } from "../middleware/user-validation.middleware";
import { userLoginValidationMiddleware } from "../middleware/user-login-validation.middleware";
import {    
    deleteUser,
    editUser,
    getAllUsers,
    getUserById,
    loginUser,
    registerUser,
} from "../controllers/user.controller";

const router = Router();

router.route('/')
    .get(getAllUsers);
    

router.route('/register')
    .post(userValidationMiddleware, registerUser);

router.route('/login')
    .post(userLoginValidationMiddleware, loginUser);

router.route('/:id')
    .delete(deleteUser)
    .get(getUserById)
    .patch(userValidationMiddleware, editUser);


export default router;