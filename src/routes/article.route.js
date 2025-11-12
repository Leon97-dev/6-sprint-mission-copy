// src/routes/article.route.js
import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import { CreateArticle, PatchArticle } from '../structs/articleStruct.js';
import {
  getArticles,
  getArticle,
  postArticle,
  patchArticle,
  deleteArticle,
} from '../controllers/article.controller.js';

const router = Router();

router.get('/', asyncHandler(getArticles));
router.get('/:id', asyncHandler(getArticle));
router.post('/', validate(CreateArticle), asyncHandler(postArticle));
router.patch('/:id', validate(PatchArticle), asyncHandler(patchArticle));
router.delete('/:id', asyncHandler(deleteArticle));

export default router;
