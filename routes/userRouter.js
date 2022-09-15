import express from 'express'
import {
    createUser,
    loginUser,
    getDashboardPage,
    getUsersPage,
    getUserPage
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

router
    .route('/users')
    .get(getUsersPage)

router
    .route('/users/:slug')
    .get(getUserPage)

export default router;