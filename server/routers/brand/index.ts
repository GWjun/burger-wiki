import { prisma } from '@server/prisma';
import {
  baseProcedure,
  commonProcedure,
  protectedProcedure,
  router,
} from '@server/trpc';
import { z } from 'zod';
import { throwTRPCError } from '@error/throwTRPCError';

export const brandRouter = router({
  getBrandById: baseProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const { id } = input;

      const brand = await prisma.brand.findUnique({
        where: {
          id,
        },
      });

      if (!brand) throwTRPCError({ code: 'NOT_FOUND' });

      return brand;
    }),

  getBrandByName: baseProcedure
    .input(z.object({ name_eng: z.string() }))
    .query(async ({ input }) => {
      const { name_eng } = input;

      const brand = await prisma.brand.findUnique({
        where: {
          name_eng,
        },
      });

      if (!brand) throwTRPCError({ code: 'NOT_FOUND' });

      return brand;
    }),

  getBestBrands: baseProcedure.query(async () => {
    const brands = await prisma.brand.findMany({
      orderBy: {
        likes_count: 'desc',
      },
      take: 5,
    });

    if (!brands) throwTRPCError({ code: 'NOT_FOUND' });

    return brands;
  }),

  getAllBrands: baseProcedure.query(async () => {
    const brands = await prisma.brand.findMany();

    if (!brands) throwTRPCError({ code: 'NOT_FOUND' });

    return brands;
  }),

  getAllBrandsName: baseProcedure.query(async () => {
    const brands = await prisma.brand.findMany();

    if (!brands) throwTRPCError({ code: 'NOT_FOUND' });

    return brands.map((brand) => brand.name);
  }),

  getBrandLike: commonProcedure
    .input(z.object({ brand_id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { brand_id } = input;
      const { user } = ctx;

      if (!user || !user.id) return false;

      const brandLike = await prisma.brandLike.findUnique({
        where: {
          userId_brand_id: { userId: user.id, brand_id },
        },
      });

      if (!brandLike) return false;
      return true;
    }),

  toggleBrandLike: protectedProcedure
    .input(
      z.object({
        brand_id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { brand_id } = input;
      const { userId } = ctx;

      return prisma.$transaction(async (tx) => {
        const existingLike = await tx.brandLike.findUnique({
          where: {
            userId_brand_id: { userId, brand_id },
          },
        });

        if (existingLike) {
          await tx.brandLike.delete({
            where: {
              userId_brand_id: { userId, brand_id },
            },
          });

          await tx.brand.update({
            where: { id: brand_id },
            data: {
              likes_count: { decrement: 1 },
            },
          });
        } else {
          await tx.brandLike.create({
            data: { userId, brand_id },
          });

          await tx.brand.update({
            where: { id: brand_id },
            data: {
              likes_count: { increment: 1 },
            },
          });
        }
      });
    }),
});
