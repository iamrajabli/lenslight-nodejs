import express from 'express'
import { createUser, loginUser } from "../controllers/userController.js";


const router = express.Router()


router
    .route('/users/register')
    .post(createUser)

router
    .route('/users/login')
    .post(loginUser)

export default router;