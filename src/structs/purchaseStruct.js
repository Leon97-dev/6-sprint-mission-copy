// src/structs/purchaseStruct.js
import * as s from 'superstruct';

export const PurchaseProduct = s.object({
  productId: s.min(s.integer(), 1),
  quantity: s.min(s.integer(), 1),
});
