// src/controllers/articleComment.controller.js
import { prisma } from '../config/prisma.js';

// 게시판 댓글 전부 보기
export const getCommentsByArticle = async (req, res) => {
  const articleId = Number(req.params.articleId);
  if (!Number.isInteger(articleId)) {
    return res.status(400).json({ message: '정수가 아닌 id입니다.' });
  }

  const comments = await prisma.articleComment.findMany({
    where: { articleId },
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });
  res.json(comments);
};

// 게시판 댓글 등록
export const postCommentsByArticle = async (req, res) => {
  const { articleId, content } = req.body;
  if (!Number.isInteger(Number(articleId)) || !content) {
    return res
      .status(400)
      .json({ message: 'id가 잘못되었거나 댓글 내용이 없습니다.' });
  }

  const comment = await prisma.articleComment.create({
    data: { articleId: Number(articleId), content },
  });
  res.status(201).json(comment);
};

// 게시판 댓글 수정
export const patchCommentsByArticle = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: '정수가 아닌 id입니다.' });
  }

  const comment = await prisma.articleComment.update({
    where: { id },
    data: { content: req.body.content },
  });
  res.json(comment);
};

// 게시판 댓글 삭제
export const deleteCommentsByArticle = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: '정수가 아닌 id입니다.' });
  }

  await prisma.articleComment.delete({
    where: { id },
  });
  res.sendStatus(204);
};
