// src/routes/upload.route.js
import { Router } from 'express';
import { upload } from '../config/multer.js';
import { uploadImage } from '../controllers/upload.controller.js';

const router = Router();

router.post('/', upload.single('image'), uploadImage);

export default router;
