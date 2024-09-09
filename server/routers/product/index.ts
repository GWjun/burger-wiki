import { prisma } from '#server/prisma';
import { baseProcedure, router } from '#server/trpc';
import { z } from 'zod';

export const productRouter = router({
  getRecentProducts: baseProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).nullish(),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 30;
      const { cursor } = input;

      const products = await prisma.product.findMany({
        take: limit + 1,
        cursor: cursor ? { product_id: cursor } : undefined,
        orderBy: {
          released_at: 'desc',
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (products.length > limit) {
        const nextItem = products.pop();
        nextCursor = Number(nextItem!.product_id);
      }
      return {
        products,
        nextCursor,
      };
    }),
});
