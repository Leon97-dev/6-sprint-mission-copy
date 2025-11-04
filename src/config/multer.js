// src/config/multer.js
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const validExt = ['.jpg', '.jpeg', '.png'].includes(ext) ? ext : '';
    cb(null, crypto.randomUUID() + validExt);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const isValidType = ['image/jpeg', 'image/png'].includes(file.mimetype);
    cb(
      isValidType ? null : new Error('jpeg/png만 업로드 가능합니다.'),
      isValidType
    );
  },
});
