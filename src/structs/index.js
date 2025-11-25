// src/validators/index.js
import * as s from 'superstruct';

// 요청 바디를 주어진 superstruct 스키마로 검증해 주는 미들웨어
export const validate = (schema) => (req, _res, next) => {
  try {
    s.assert(req.body, schema);
    return next();
  } catch (error) {
    next(error);
  }
};
