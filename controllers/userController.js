import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {

    try {
        const user = await User.create(req.body);
        res
            .status(201)
            .json({
                success: true,
                user
            })

    } catch (error) {
        res
            .status(404)
            .json({
                success: false,
                error
            })

    }
}

export const loginUser = async (req, res) => {

    try {

        const { username, password } = req.body;

        const user = await User.findOne({ username });
        let same = false;

        user ?
            same = await bcrypt.compare(password, user.password)
            : res
                .status(404)
                .json({
                    success: false,
                    message: 'Not found this username'
                })

        same ?
            res
                .status(200)
                .json({
                    success: true,
                    user,
                    message: 'You are logged in',
                    token: createToken(user._id)
                })
            : res
                .status(404)
                .json({
                    success: false,
                    message: 'Username or pass incorrect'
                })



    } catch (error) {
        res
            .status(404)
            .json({
                success: false,
                error
            })

    }

}

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}