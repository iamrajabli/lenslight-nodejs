import { Photo } from "../models/photoModel.js"
import { v2 as cloudinary } from 'cloudinary';
import User from "../models/userModel.js";
import fs from 'fs';

// POST
export const createPhoto = async (req, res) => {

    try {

        let result;
        const file = req.files.image
        const type = file.mimetype;

        if (type !== 'image/png' || type !== 'image/jpg' || type !== 'image/jpeg') {
            result = await cloudinary.uploader.upload(
                file.tempFilePath,
                {
                    use_filename: true,
                    folder: "lensligth_az"
                }
            )
        }

        fs.unlinkSync(file.tempFilePath);

        await Photo.create({
            ...req.body,
            user: res.locals.user._id,
            url: result.secure_url,
            image_id: result.public_id
        });


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
        const user = await User.findById(photo.user);
        photo.username = user.username;
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

export const deleteAPhoto = async (req, res) => {

    try {

        const photo = await Photo.findById({ _id: req.params.id })
        await cloudinary.uploader.destroy(photo.image_id)
        await Photo.findOneAndRemove({ _id: req.params.id })

        res
            .status(200)
            .redirect('/users/dashboard')

    } catch (error) {
        res
            .status(404)
            .json({
                success: false,
                error
            })
    }
}