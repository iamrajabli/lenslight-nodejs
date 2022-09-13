import { Photo } from "../models/photoModel.js"

// POST
export const createPhoto = async (req, res) => {
    try {
        await Photo.create({ ...req.body, user: res.locals.user._id });
        res.redirect('/users/dashboard')
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
}

// GET
export const getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({});
        res.status(200).render('photos', {
            photos,
            link: "photos"
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error
        })
    }
}

export const getAPhoto = async (req, res) => {
    try {
        const photo = await Photo.findById({ _id: req.params.id });
        res
            .status(200)
            .render('photo', { photo, link: 'photos' })
    } catch (error) {
        res
            .status(404)
            .json({
                success: false,
                error
            })

    }

}