// TODO) Upload-Controller: 요청 처리
import type { Request, Response } from 'express';

export const uploadController = {
  image(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: '업로드된 파일이 없습니다.',
      });
    }

    return res.status(201).json({
      success: true,
      path: `/uploads/${req.file.filename}`,
    });
  },
};
