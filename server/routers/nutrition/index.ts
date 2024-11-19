import { prisma } from '@server/prisma';
import { baseProcedure, router } from '@server/trpc';
import { z } from 'zod';
import { getErrorCode } from '@error/error';

export const nutritionRouter = router({
  getInfoByProductId: baseProcedure
    .input(
      z.object({
        product_id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const product_id = input.product_id;
      const nutrition_info = await prisma.nutrition.findUnique({
        where: { product_id },
      });

      if (!nutrition_info) throw new Error(getErrorCode('NOT_FOUND'));

      return nutrition_info;
    }),
});
