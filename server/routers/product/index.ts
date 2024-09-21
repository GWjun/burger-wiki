import { prisma } from '#server/prisma';
import { baseProcedure, router } from '#server/trpc';
import { z } from 'zod';
import { getErrorMessage } from '#error/error';

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

  getBestProducts: baseProcedure
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
          likes_count: 'desc',
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

  getProductById: baseProcedure
    .input(
      z.object({
        product_id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const product_id = input.product_id;
      const product = await prisma.product.findUnique({
        where: { product_id },
      });

      if (!product) throw new Error(getErrorMessage('NOT_FOUND'));

      return product;
    }),

  addProductLike: baseProcedure
    .input(
      z.object({
        userId: z.string(),
        product_id: z.number(),
        is_like: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const { userId, product_id, is_like } = input;

      return prisma.$transaction(async (tx) => {
        const existingLike = await tx.productLike.findUnique({
          where: {
            userId_product_id: { userId, product_id },
          },
        });

        if (existingLike) {
          if (existingLike.is_like === is_like) {
            if (is_like === true)
              throw new Error(getErrorMessage('ALREADY_LIKED'));
            else throw new Error(getErrorMessage('ALREADY_DISLIKED'));
          } else {
            await tx.product.update({
              where: { product_id },
              data: {
                likes_count: { decrement: existingLike.is_like ? 1 : 0 },
                dislikes_count: { decrement: existingLike.is_like ? 0 : 1 },
              },
            });

            await tx.productLike.delete({
              where: { id: existingLike.id },
            });
          }
        }

        await tx.productLike.create({
          data: { userId, product_id, is_like },
        });

        await tx.product.update({
          where: { product_id },
          data: {
            likes_count: { increment: is_like ? 1 : 0 },
            dislikes_count: { increment: is_like ? 0 : 1 },
          },
        });

        return existingLike;
      });
    }),
});
