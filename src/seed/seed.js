// src/seed/seed.js
import { prisma } from '../config/prisma.js';
import { mockProducts } from '../mock/mockProduct.js';
import { mockArticles } from '../mock/mockArticle.js';
import { mockProductComments } from '../mock/mockProductComments.js';
import { mockArticleComments } from '../mock/mockArticleComments.js';

async function main() {
  await prisma.purchase.deleteMany();
  await prisma.productComment.deleteMany();
  await prisma.articleComment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.product.deleteMany();

  await prisma.product.createMany({ data: mockProducts });
  await prisma.article.createMany({ data: mockArticles });

  await prisma.productComment.createMany({ data: mockProductComments });
  await prisma.articleComment.createMany({ data: mockArticleComments });

  const [productCount, articleCount, pCommentCount, aCommentCount] =
    await Promise.all([
      prisma.product.count(),
      prisma.article.count(),
      prisma.productComment.count(),
      prisma.articleComment.count(),
    ]);

  console.log(
    `시드 성공: products: ${productCount} / articles: ${articleCount}`
  );
  console.log(
    `시드 성공: ProductComments: ${pCommentCount} / ArticleComments: ${aCommentCount}`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(`시드 실패: ${e}`);
    await prisma.$disconnect();
    process.exit(1);
  });
