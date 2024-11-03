import { prisma } from '#server/prisma';
import { baseProcedure, protectedProcedure, router } from '#server/trpc';
import { z } from 'zod';
import { getErrorCode } from '#error/error';
import { BrandProductOrderType } from '#entities/product';

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

      if (!product) throw new Error(getErrorCode('NOT_FOUND'));

      return product;
    }),

  getAllProducts: baseProcedure.query(async () => {
    const products = await prisma.product.findMany();

    if (!products) throw new Error(getErrorCode('NOT_FOUND'));

    return products;
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

  getBrandProducts: baseProcedure
    .input(
      z.object({
        brand_name_kor: z.string(),
        order: z.custom<BrandProductOrderType>().default('RELEASE'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
        limit: z.number().min(1).max(50).nullish(),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 30;
      const { cursor, brand_name_kor, order, sortOrder } = input;

      let orderField: string;
      let orderValue: any = sortOrder;
      switch (order) {
        case 'RELEASE':
          orderField = 'released_at';
          orderValue = {
            sort: sortOrder,
            nulls: 'last',
          };
          break;
        case 'NAME':
          orderField = 'name';
          orderValue = sortOrder === 'asc' ? 'desc' : 'asc';
          break;
        case 'HIGHEST_RATING':
          orderField = 'score_avg';
          break;
        case 'MOST_LIKES':
          if (sortOrder === 'desc') orderField = 'likes_count';
          else {
            orderField = 'dislikes_count';
            orderValue = 'desc';
          }
          break;
        default:
          orderField = 'released_at';
      }

      const products = await prisma.product.findMany({
        take: limit + 1,
        cursor: cursor ? { product_id: cursor } : undefined,
        where: {
          brand_name: brand_name_kor,
        },
        orderBy: [{ [orderField]: orderValue }, { product_id: 'asc' }],
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
