import express from 'express'
import { createUser } from "../controllers/userController.js";


const router = express.Router()


router
    .route('/users/register')
    .post(createUser)

export default router;