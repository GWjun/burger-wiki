import { prisma } from '#server/prisma';
import { baseProcedure, router } from '#server/trpc';

export const productRouter = router({
  getRecentProducts: baseProcedure.query(async () => {
    const products = await prisma.product.findMany({
      orderBy: {
        released_at: 'desc',
      },
    });

    return products;
  }),
});
