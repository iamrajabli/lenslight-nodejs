import express from 'express';
import { getIndexPage, getAboutPage, getRegisterPage } from '../controllers/pageController.js';

const router = express.Router();

router.route('/').get(getIndexPage)
router.route('/about').get(getAboutPage)
router.route('/register').get(getRegisterPage)

export default router;