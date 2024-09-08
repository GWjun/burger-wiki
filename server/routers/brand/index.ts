import { prisma } from '#server/prisma';
import { baseProcedure, router } from '#server/trpc';
import { z } from 'zod';
import { getErrorMessage } from '#error/error';

export const brandRouter = router({
  getBrandById: baseProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const brand = await prisma.brand.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!brand) throw new Error(getErrorMessage('NOT_FOUND'));

      return brand;
    }),

  getBrandNameById: baseProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const brandName = await prisma.brand.findUnique({
        where: {
          id: input.id,
        },
        select: {
          name: true,
        },
      });

      if (!brandName) throw new Error(getErrorMessage('NOT_FOUND'));

      return brandName;
    }),
});
