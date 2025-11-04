// src/structs/productStruct.js
import * as s from 'superstruct';

const TAGS = [
  'NONE',
  'FASHION',
  'BEAUTY',
  'SPORTS',
  'ELECTRONICS',
  'HOME_INTERIOR',
  'HOUSEHOLD_SUPPLIES',
  'KITCHENWARE',
];

export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 20),
  description: s.optional(s.string()),
  price: s.min(s.number(), 0),
  stock: s.min(s.integer(), 0),
  tags: s.enums(TAGS),
  imagePath: s.optional(s.string()),
});

export const PatchProduct = s.partial(CreateProduct);
