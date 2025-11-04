// src/controllers/upload.controller.js
export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: '업로드된 파일이 없습니다.' });
  }
  res.status(201).json({ path: `/uploads/${req.file.filename}` });
};
