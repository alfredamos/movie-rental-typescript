import { Router } from "express";
import { userValidationMiddleware } from "../middleware/user-validation.middleware";
import { 
    createUser,   
    deleteUser,
    editUser,
    getAllUsers,
    getUserById,    
} from "../controllers/user.controller";


import { checkIfAuthenticated } from "../middleware/check-if-authenticated.middleware";
import { checkIfAdmin } from "../middleware/check-if-admin.middleware";

const router = Router();

router.route('/')
    .get(checkIfAuthenticated, getAllUsers)
    .post(userValidationMiddleware, checkIfAuthenticated, checkIfAdmin, createUser);
    

router.route('/:id')
    .delete(checkIfAuthenticated, checkIfAdmin, deleteUser)
    .get(checkIfAuthenticated, getUserById)
    .patch(userValidationMiddleware, checkIfAuthenticated, checkIfAdmin, editUser);


export default router;