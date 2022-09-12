import express from 'express'
import {
    createUser,
    loginUser,
    getDashboardPage
} from "../controllers/userController.js";
import { authenticateToken } from '../middlewares/authMiddleware.js';



const router = express.Router()


router
    .route('/users/register')
    .post(createUser)

router
    .route('/users/login')
    .post(loginUser)


router
    .route('/users/dashboard')
    .get(authenticateToken, getDashboardPage)

export default router;