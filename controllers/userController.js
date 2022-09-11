import User from '../models/userModel.js';

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
