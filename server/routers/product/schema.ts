import { z } from 'zod';
import { Patty } from '@prisma/client';

export const ProductFilterSchema = z.object({
  brands: z.array(z.string()).optional(),
  calories: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),
  pattyTypes: z.array(z.nativeEnum(Patty)).optional(),
  price: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),
});

export type ProductFilterType = z.infer<typeof ProductFilterSchema>;
