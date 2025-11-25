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
/* ✅ 멘토님 리뷰
DB에 insert를 하기 전에 컨트롤러 혹은 validate 단에서 먼저 유효성 체크하는 방법을 시도해보세요.
만약 enum이 추가/삭제된다면 DB까지 수정이 필요하여 번거로워질 수 있습니다. 
*/
export const PatchProduct = s.partial(CreateProduct);
