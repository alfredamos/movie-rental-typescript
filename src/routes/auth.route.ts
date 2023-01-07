import { Router } from "express";
import { userValidationMiddleware } from "../middleware/user-validation.middleware";
import { userLoginValidationMiddleware } from "../middleware/user-login-validation.middleware";
import { userProfileValidationMiddleware } from "../middleware/user-profile-validation.middleware";
import { userChangePasswordValidationMiddleware } from '../middleware/user-change-password-validation.middleware';
import {
  changePasswordOfUser,
  loginUser,
  profileOfUser,
  profileOfUserById,
  registerUser,
} from "../controllers/auth.controller";

const router = Router();

router.route('/change-password')
      .patch(userChangePasswordValidationMiddleware, changePasswordOfUser);

router.route("/login").post(userLoginValidationMiddleware, loginUser);

router.route("/profile").patch(userProfileValidationMiddleware, profileOfUser);

router.route("/profile/:id").patch(userProfileValidationMiddleware, profileOfUserById);

router.route("/signup").post(userValidationMiddleware, registerUser);

export default router;
