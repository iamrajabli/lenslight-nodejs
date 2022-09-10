import express from 'express';
import { createPhoto, getAllPhotos } from '../controllers/photoController.js';


const router = express.Router();

router.route('/photo').post(createPhoto);
router.route('/photo').get(getAllPhotos);

export default router;