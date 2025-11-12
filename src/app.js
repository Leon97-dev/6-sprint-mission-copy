// src/app.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import uploadRouter from './routes/upload.route.js';
import productsRouter from './routes/product.route.js';
import articlesRouter from './routes/article.route.js';
import productCommentsRouter from './routes/productComment.route.js';
import articleCommentsRouter from './routes/articleComment.route.js';

const app = express();

// 글로벌 미들웨어
app.use(cors());
app.use(express.json());

// 정적 리소스
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// API 라우트
app.use('/upload', uploadRouter);
app.use('/products', productsRouter);
app.use('/articles', articlesRouter);
app.use('/product-comments', productCommentsRouter);
app.use('/article-comments', articleCommentsRouter);

// 헬스체크
app.get('/health', (_req, res) => res.send({ ok: true }));

// 에러 핸들러
app.use(notFound);
app.use(errorHandler);

export default app;
