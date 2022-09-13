import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const checkUser = async (req, res, next) => {
    const token = req.cookies['jwt'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                res.locals.user = await User.findById(decodedToken.userId);
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }

}


export const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies['jwt'];
        token ?
            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                err ? res.redirect('/login') : next()
            })
            : res.redirect('/login')

    } catch {
        res.status(401).json({
            success: false,
            error: 'Not authorized'
        })
    }
}