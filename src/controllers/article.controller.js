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
  /* ✅ 멘토님 리뷰
  order에 대한 request값도 enum으로 관리하거나,
  상수로 빼두면 목록조회할 때 유용하게 사용할 수 있을 것 같습니다:)
  */
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
    /* ✅ 멘토님 리뷰
    전반적으로 controller에 있는 request에 대한 타입체킹도,
    structs를 활용하는 방식을 사용하면 좋을 것 같습니다 :)
    */
    return res.status(400).json({ message: '정수가 아닌 id입니다.' });
  }

  const article = await prisma.article.findUniqueOrThrow({
    /* ✅ 멘토님 리뷰
    DB단에서 에러를 던지는 것보다 find만 하고, 
    DB조회결과가 없을경우 4xx를 응답하는 방식으로 개선해보면 좋을 것 같습니다. 
    */
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
  /* ✅ 멘토님 리뷰
  request로 넘어온 id값이 db에 존재하지 않은 값인 경우도 고려해보면 좋을 것 같습니다. 
  */
  await prisma.article.delete({
    where: { id },
  });
  res.sendStatus(204);
};
