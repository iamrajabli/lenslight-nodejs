import { Photo } from "../models/photoModel.js"

// POST
export const createPhoto = async (req, res) => {
    try {
        const photo = await Photo.create(req.body);
        res.status(201).json({
            success: true,
            photo
        })
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
        res.status(200).json({
            success: true,
            photos
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            error
        })
    }
}