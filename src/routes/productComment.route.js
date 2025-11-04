// src/routes/productComment.route.js
import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import {
  getCommentsByProduct,
  postCommentsByProduct,
  patchCommentsByProduct,
  deleteCommentsByProduct,
} from '../controllers/productComment.controller.js';

const router = Router();

router.get('/:productId', asyncHandler(getCommentsByProduct));
router.post('/', asyncHandler(postCommentsByProduct));
router.patch('/:id', asyncHandler(patchCommentsByProduct));
router.delete('/:id', asyncHandler(deleteCommentsByProduct));

export default router;
