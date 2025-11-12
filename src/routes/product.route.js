// src/routes/product.route.js
import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import { CreateProduct, PatchProduct } from '../structs/productStruct.js';
import { PurchaseProduct } from '../structs/purchaseStruct.js';
import {
  getProducts,
  getProduct,
  postProduct,
  patchProduct,
  deleteProduct,
  purchaseProduct,
} from '../controllers/product.controller.js';

const router = Router();

router.get('/', asyncHandler(getProducts));
router.get('/:id', asyncHandler(getProduct));
router.post('/', validate(CreateProduct), asyncHandler(postProduct));
router.patch('/:id', validate(PatchProduct), asyncHandler(patchProduct));
router.delete('/:id', asyncHandler(deleteProduct));
router.post(
  '/purchase',
  validate(PurchaseProduct),
  asyncHandler(purchaseProduct)
);

export default router;
