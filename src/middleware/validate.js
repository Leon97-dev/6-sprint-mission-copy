// src/middleware/validate.js
import * as s from 'superstruct';

export const validate = (schema) => (req, res, next) => {
  try {
    s.assert(req.body, schema);
    next();
  } catch (e) {
    next(Object.assign(e, { status: 400 }));
  }
};
