import { prisma } from '@server/prisma';
import { baseProcedure, router } from '@server/trpc';
import { z } from 'zod';
import { throwTRPCError } from '@error/throwTRPCError';

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

      if (!nutrition_info) throwTRPCError({ code: 'NOT_FOUND' });

      return nutrition_info;
    }),
});
