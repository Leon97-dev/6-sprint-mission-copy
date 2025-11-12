// src/routes/articleComment.route.js
import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import {
  getCommentsByArticle,
  postCommentsByArticle,
  patchCommentsByArticle,
  deleteCommentsByArticle,
} from '../controllers/articleComment.controller.js';

const router = Router();

router.get('/:articleId', asyncHandler(getCommentsByArticle));
router.post('/', asyncHandler(postCommentsByArticle));
router.patch('/:id', asyncHandler(patchCommentsByArticle));
router.delete('/:id', asyncHandler(deleteCommentsByArticle));

export default router;
