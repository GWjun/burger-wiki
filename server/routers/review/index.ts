import { prisma } from '@server/prisma';
import { baseProcedure, protectedProcedure, router } from '@server/trpc';
import { z } from 'zod';
import { getErrorCode } from '@error/error';
import { ReviewOrderType } from '#entities/review';

export const reviewRouter = router({
  getReviews: baseProcedure
    .input(
      z.object({
        product_id: z.number(),
        order: z.custom<ReviewOrderType>().default('LATEST'),
        withImage: z.boolean().default(false),
        limit: z.number().min(1).max(50).nullish(),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 30;
      const { product_id, order, withImage, cursor } = input;

      let where: any = { product_id };
      let orderBy: any = { created_at: 'desc' };

      switch (order) {
        case 'HIGHEST_RATING':
          orderBy = { score: 'desc' };
          break;
        case 'LOWEST_RATING':
          orderBy = { score: 'asc' };
          break;
        case 'MOST_LIKES':
          orderBy = { likes_count: 'desc' };
          break;
      }

      if (withImage) where = { ...where, ReviewImage: { some: {} } };

      const reviews = await prisma.review.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          User: true,
          ReviewImage: true,
        },
        where,
        orderBy,
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (reviews.length > limit) {
        const nextItem = reviews.pop();
        nextCursor = Number(nextItem!.id);
      }
      return {
        reviews,
        nextCursor,
      };
    }),

  addReview: protectedProcedure
    .input(
      z.object({
        product_id: z.number(),
        score: z.number().min(0.5).max(5),
        comment: z.string().optional(),
        consumed_at: z.date(),
        image_url: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { product_id, comment, consumed_at, score, image_url } = input;
      const { userId } = ctx;

      return prisma.$transaction(async (tx) => {
        await tx.review.create({
          data: {
            userId,
            product_id,
            comment,
            consumed_at,
            score,
            ReviewImage: {
              create: image_url?.map((url) => ({ image_url: url })) || [],
            },
          },
          include: {
            ReviewImage: true,
          },
        });

        const product = await tx.product.findUnique({
          where: { product_id },
          select: { score_avg: true, review_count: true },
        });

        if (!product) {
          throw new Error(getErrorCode('NOT_FOUND'));
        }

        const newReviewCount = product.review_count + 1;
        const newScoreAvg =
          (product.score_avg * product.review_count + score) / newReviewCount;

        await tx.product.update({
          where: { product_id },
          data: {
            score_avg: newScoreAvg,
            review_count: newReviewCount,
          },
        });
      });
    }),

  updateReview: protectedProcedure
    .input(
      z.object({
        review_id: z.number(),
        score: z.number().min(0.5).max(5).optional(),
        comment: z.string().optional(),
        consumed_at: z.date().optional(),
        image_url: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { review_id, score, comment, consumed_at, image_url } = input;
      const { userId } = ctx;

      return prisma.$transaction(async (tx) => {
        const existingReview = await tx.review.findUnique({
          where: { id: review_id },
          include: { ReviewImage: true },
        });

        if (!existingReview) {
          throw new Error(getErrorCode('NOT_FOUND'));
        }

        if (existingReview.userId !== userId) {
          throw new Error(getErrorCode('FORBIDDEN'));
        }

        await tx.review.update({
          where: { id: review_id },
          data: {
            score: score ?? existingReview.score,
            comment: comment ?? existingReview.comment,
            consumed_at: consumed_at ?? existingReview.consumed_at,
            ReviewImage: image_url
              ? {
                  deleteMany: {},
                  create: image_url.map((url) => ({ image_url: url })),
                }
              : undefined,
          },
          include: {
            ReviewImage: true,
          },
        });

        if (score !== undefined && score !== existingReview.score) {
          const product = await tx.product.findUnique({
            where: { product_id: existingReview.product_id },
            select: { score_avg: true, review_count: true },
          });

          if (product) {
            const newScoreAvg =
              (product.score_avg * product.review_count -
                existingReview.score +
                score) /
              product.review_count;

            await tx.product.update({
              where: { product_id: existingReview.product_id },
              data: { score_avg: newScoreAvg },
            });
          }
        }
      });
    }),

  removeReview: protectedProcedure
    .input(z.object({ review_id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { review_id } = input;
      const { userId } = ctx;

      return prisma.$transaction(async (tx) => {
        const existingReview = await tx.review.findUnique({
          where: { id: review_id },
        });

        if (!existingReview) {
          throw new Error(getErrorCode('NOT_FOUND'));
        }

        if (existingReview.userId !== userId) {
          throw new Error(getErrorCode('FORBIDDEN'));
        }

        await tx.review.delete({
          where: { id: review_id },
        });

        const product = await tx.product.findUnique({
          where: { product_id: existingReview.product_id },
          select: { score_avg: true, review_count: true },
        });

        if (product) {
          const newReviewCount = product.review_count - 1;
          const newScoreAvg =
            newReviewCount > 0
              ? (product.score_avg * product.review_count -
                  existingReview.score) /
                newReviewCount
              : 0;

          await tx.product.update({
            where: { product_id: existingReview.product_id },
            data: {
              score_avg: newScoreAvg,
              review_count: newReviewCount,
            },
          });
        }
      });
    }),

  addReviewLike: protectedProcedure
    .input(
      z.object({
        review_id: z.number(),
        is_like: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { review_id, is_like } = input;
      const { userId } = ctx;

      return prisma.$transaction(async (tx) => {
        const existingLike = await tx.reviewLike.findUnique({
          where: {
            userId_review_id: { userId, review_id },
          },
        });

        if (existingLike) {
          if (existingLike.is_like === is_like) {
            if (is_like === true)
              throw new Error(getErrorCode('ALREADY_LIKED'));
            else throw new Error(getErrorCode('ALREADY_DISLIKED'));
          } else {
            await tx.review.update({
              where: { id: review_id },
              data: {
                likes_count: { decrement: existingLike.is_like ? 1 : 0 },
                dislikes_count: { decrement: existingLike.is_like ? 0 : 1 },
              },
            });

            await tx.reviewLike.delete({
              where: { id: existingLike.id },
            });
          }
        }

        await tx.reviewLike.create({
          data: { userId, review_id, is_like },
        });

        await tx.review.update({
          where: { id: review_id },
          data: {
            likes_count: { increment: is_like ? 1 : 0 },
            dislikes_count: { increment: is_like ? 0 : 1 },
          },
        });
      });
    }),
});
