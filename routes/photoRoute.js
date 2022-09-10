import express from 'express';
import { createPhoto, getAllPhotos, getAPhoto } from '../controllers/photoController.js';


const router = express.Router();

router
    .route('/photos')
    .post(createPhoto)
    .get(getAllPhotos)

router
    .route('/photos/:id')
    .get(getAPhoto)

export default router;