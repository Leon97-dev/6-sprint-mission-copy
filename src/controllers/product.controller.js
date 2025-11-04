// src/controllers/product.controller.js
import { prisma } from '../config/prisma.js';

// 마켓 전부 보기
export const getProducts = async (req, res) => {
  const { offset = 0, limit = 10, order = 'recent', q, tag } = req.query;
  const where = {
    ...(q && {
      OR: [
        { name: { contains: String(q), mode: 'insensitive' } },
        { description: { contains: String(q), mode: 'insensitive' } },
      ],
    }),
    ...(tag && { tags: String(tag) }),
  };

  const orderBy =
    order === 'recent' ? { createdAt: 'desc' } : { createdAt: 'asc' };

  const products = await prisma.product.findMany({
    where,
    orderBy,
    skip: Number(offset),
    take: Number(limit),
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      createdAt: true,
      imagePath: true,
    },
  });
  res.json(products);
};

// 마켓 보기
export const getProduct = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: '정수가 아닌 id입니다.' });
  }

  const product = await prisma.product.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tags: true,
      stock: true,
      imagePath: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.json(product);
};

// 마켓 등록
export const postProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: req.body,
  });
  res.status(201).json(product);
};

// 마켓 수정
export const patchProduct = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: '정수가 아닌 id입니다.' });
  }

  const product = await prisma.product.update({
    where: { id },
    data: req.body,
  });
  res.json(product);
};

// 마켓 삭제
export const deleteProduct = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: '정수가 아닌 id입니다.' });
  }

  await prisma.product.delete({
    where: { id },
  });
  res.sendStatus(204);
};

// 마켓 구매
export const purchaseProduct = async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: Number(productId) },
    select: { id: true, stock: true, price: true },
  });

  if (quantity > product.stock) {
    return res.status(400).json({ message: '재고가 충분하지 않습니다.' });
  }

  const result = await prisma.$transaction(async (pr) => {
    const updated = await pr.product.update({
      where: { id: product.id },
      data: { stock: { decrement: quantity } },
      select: { id: true, name: true, stock: true },
    });
    const purchase = await pr.purchase.create({
      data: {
        productId: product.id,
        quantity,
        unitPrice: product.price,
      },
    });
    return { updated, purchase };
  });
  res.status(201).json(result);
};
