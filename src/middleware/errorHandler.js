// src/middleware/errorHandler.js
import { Prisma } from '@prisma/client';
import { env } from '../config/env.js';

export const notFound = (req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
};

export const errorHandler = (e, _req, res, _next) => {
  let status = e.status || 500;
  let message = e.message || 'Server Error';

  if (
    e.name === 'StructError' ||
    e instanceof Prisma.PrismaClientValidationError
  ) {
    status = 400;
  }
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2025') status = 404;
  }
  res.status(status).json({
    message,
    detail: env.nodeEnv === 'development' ? String(e) : undefined,
  });
};
