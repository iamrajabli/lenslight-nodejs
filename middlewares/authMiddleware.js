import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.json({
                success: false,
                error: 'No token available!'
            })
        }

        req.user = await User.findById(
            jwt.verify(token, process.env.JWT_SECRET).userId
        );


        next();
    } catch {
        res.status(401).json({
            success: false,
            error: 'Not authorized'
        })
    }
}