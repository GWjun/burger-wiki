import { prisma } from '@server/prisma';
import { baseProcedure, protectedProcedure, router } from '@server/trpc';
import { z } from 'zod';
import { getErrorCode } from '@error/error';

import { ProductFilterSchema } from '@server/routers/product/schema';
import { ProductOrderType } from '#entities/product';
import getOrderClause from './getOrderClause';
import getWhereClause from './getWhereClause';

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
        where: {
          released_at: {
            not: null,
          },
        },
        orderBy: [{ released_at: 'desc' }, { product_id: 'asc' }],
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (products.length > limit) {
        const nextItem = products.pop();
        nextCursor = Number(nextItem!.product_id);
      }
      return {
        data: products,
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
        where: {
          likes_count: {
            gt: 0,
          },
        },
        orderBy: [
          { likes_count: 'desc' },
          { dislikes_count: 'asc' },
          { product_id: 'asc' },
        ],
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (products.length > limit) {
        const nextItem = products.pop();
        nextCursor = Number(nextItem!.product_id);
      }
      return {
        data: products,
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

      if (!product) throw new Error(getErrorCode('NOT_FOUND'));

      return product;
    }),

  getAllProducts: baseProcedure.query(async () => {
    const products = await prisma.product.findMany();

    if (!products) throw new Error(getErrorCode('NOT_FOUND'));

    return products;
  }),

  getFilteredProducts: baseProcedure
    .input(
      z.object({
        filters: ProductFilterSchema.optional(),
        order: z.custom<ProductOrderType>().default('release'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
        limit: z.number().min(1).max(50).nullish(),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 30;
      const { cursor, filters, order, sortOrder } = input;

      const { orderField, orderValue } = getOrderClause(order, sortOrder);
      const where = getWhereClause(filters);

      const products = await prisma.product.findMany({
        take: limit + 1,
        cursor: cursor ? { product_id: cursor } : undefined,
        where,
        orderBy: [{ [orderField]: orderValue }, { product_id: 'asc' }],
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (products.length > limit) {
        const nextItem = products.pop();
        nextCursor = Number(nextItem!.product_id);
      }
      return {
        data: products,
        nextCursor,
      };
    }),

  addProductLike: protectedProcedure
    .input(
      z.object({
        product_id: z.number(),
        is_like: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { product_id, is_like } = input;
      const { userId } = ctx;

      return prisma.$transaction(async (tx) => {
        const existingLike = await tx.productLike.findUnique({
          where: {
            userId_product_id: { userId, product_id },
          },
        });

        if (existingLike) {
          if (existingLike.is_like === is_like) {
            if (is_like === true)
              throw new Error(getErrorCode('ALREADY_LIKED'));
            else throw new Error(getErrorCode('ALREADY_DISLIKED'));
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
      });
    }),
});
