"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_validation_middleware_1 = require("../middleware/user-validation.middleware");
const user_login_validation_middleware_1 = require("../middleware/user-login-validation.middleware");
const user_profile_validation_middleware_1 = require("../middleware/user-profile-validation.middleware");
const user_change_password_validation_middleware_1 = require("../middleware/user-change-password-validation.middleware");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.route('/change-password')
    .patch(user_change_password_validation_middleware_1.userChangePasswordValidationMiddleware, auth_controller_1.changePasswordOfUser);
router.route("/login").post(user_login_validation_middleware_1.userLoginValidationMiddleware, auth_controller_1.loginUser);
router.route("/profile").patch(user_profile_validation_middleware_1.userProfileValidationMiddleware, auth_controller_1.profileOfUser);
router.route("/profile/:id").patch(user_profile_validation_middleware_1.userProfileValidationMiddleware, auth_controller_1.profileOfUserById);
router.route("/signup").post(user_validation_middleware_1.userValidationMiddleware, auth_controller_1.registerUser);
exports.default = router;
