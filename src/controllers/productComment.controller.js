// src/controllers/productComment.controller.js
import { prisma } from '../config/prisma.js';

// 마켓 댓글 전부 보기
export const getCommentsByProduct = async (req, res) => {
  const productId = Number(req.params.productId);
  if (!Number.isInteger(productId)) {
    return res.status(400).json({ message: '정수가 아닌 id입니다.' });
  }

  const comments = await prisma.productComment.findMany({
    where: { productId },
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });
  res.json(comments);
};

// 마켓 댓글 등록
export const postCommentsByProduct = async (req, res) => {
  const { productId, content } = req.body;
  if (!Number.isInteger(Number(productId)) || !content) {
    return res
      .status(400)
      .json({ message: 'id가 잘못되었거나 댓글 내용이 없습니다.' });
  }

  const comment = await prisma.productComment.create({
    data: { productId: Number(productId), content },
  });
  res.status(201).json(comment);
};

// 마켓 댓글 수정
export const patchCommentsByProduct = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: '정수가 아닌 id입니다.' });
  }

  const comment = await prisma.productComment.update({
    where: { id },
    data: { content: req.body.content },
  });
  res.json(comment);
};

// 마켓 댓글 삭제
export const deleteCommentsByProduct = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: '정수가 아닌 id입니다.' });
  }

  await prisma.productComment.delete({
    where: { id },
  });
  res.sendStatus(204);
};
