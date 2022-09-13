import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Photo } from '../models/photoModel.js';

export const createUser = async (req, res) => {

    try {
        const user = await User.create(req.body);
        res.status(201).json({ user: user.createdAt });

    } catch (error) {

        const errApi = {};

        if (error.code == 11000) {
            for (let key in error.keyPattern) {
                errApi[key] = `This ${key.toUpperCase()} already registered`;
            }
        }

        if (error.name == "ValidationError") {
            for (let key in error.errors) {
                errApi[key] = error.errors[key].message;
            }
        }

        res.json(errApi)
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

        if (same) {
            const token = createToken(user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            })


            res.redirect('/users/dashboard');
        } else {
            res
                .status(404)
                .json({
                    success: false,
                    message: 'Username or pass incorrect'
                })
        }




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

export const getDashboardPage = async (req, res) => {
    const photos = await Photo.find({ user: res.locals.user._id })
    res.render('dashboard', {
        link: 'dashboard',
        photos
    })
}