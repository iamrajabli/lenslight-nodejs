import jwt from "jsonwebtoken";

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