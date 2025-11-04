// src/controllers/article.controller.js
import { prisma } from '../config/prisma.js';

// 게시판 전부 보기
export const getArticles = async (req, res) => {
  const { offset = 0, limit = 10, order = 'recent', q } = req.query;
  const where = q
    ? {
        OR: [
          { title: { contains: String(q), mode: 'insensitive' } },
          { content: { contains: String(q), mode: 'insensitive' } },
        ],
      }
    : {};

  const orderBy =
    order === 'recent' ? { createdAt: 'desc' } : { createdAt: 'asc' };

  const articles = await prisma.article.findMany({
    where,
    orderBy,
    skip: Number(offset),
    take: Number(limit),
    select: { id: true, title: true, content: true, createdAt: true },
  });
  res.json(articles);
};

// 게시판 보기
export const getArticle = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: '정수가 아닌 id입니다.' });
  }

  const article = await prisma.article.findUniqueOrThrow({
    where: { id },
    select: {
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.json(article);
};

// 게시판 등록
export const postArticle = async (req, res) => {
  const article = await prisma.article.create({
    data: req.body,
  });
  res.status(201).json(article);
};

// 게시판 수정
export const patchArticle = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: '정수가 아닌 id입니다.' });
  }

  const article = await prisma.article.update({
    where: { id },
    data: req.body,
  });
  res.json(article);
};

// 게시판 삭제
export const deleteArticle = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: '정수가 아닌 id입니다.' });
  }

  await prisma.article.delete({
    where: { id },
  });
  res.sendStatus(204);
};
