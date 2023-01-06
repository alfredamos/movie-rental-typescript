import { Router } from "express";
import { userValidationMiddleware } from "../middleware/user-validation.middleware";
import { userLoginValidationMiddleware } from "../middleware/user-login-validation.middleware";
import {loginUser, registerUser} from "../controllers/auth.controller"


const router = Router();

router.route('/register')
    .post(userValidationMiddleware, registerUser);

router.route('/login')
    .post(userLoginValidationMiddleware, loginUser);

export default router;