import { prisma } from '#server/prisma';
import { protectedProcedure, router } from '#server/trpc';
import { z } from 'zod';

export const reviewRouter = router({
  addReview: protectedProcedure
    .input(
      z.object({
        product_id: z.number(),
        score: z.number().min(0.5).max(5),
        comment: z.string().optional(),
        consumed_at: z.date().optional(),
        image_url: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { product_id, comment, consumed_at, score, image_url } = input;
      const { userId } = ctx;

      return prisma.$transaction(async (tx) => {
        await tx.product.update({
          where: { product_id },
          data: {
            review_count: { increment: 1 },
          },
        });

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
      });
    }),
});
