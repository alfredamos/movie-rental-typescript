"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_validation_middleware_1 = require("../middleware/user-validation.middleware");
const user_login_validation_middleware_1 = require("../middleware/user-login-validation.middleware");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.route('/register')
    .post(user_validation_middleware_1.userValidationMiddleware, auth_controller_1.registerUser);
router.route('/login')
    .post(user_login_validation_middleware_1.userLoginValidationMiddleware, auth_controller_1.loginUser);
exports.default = router;
