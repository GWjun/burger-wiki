import { baseProcedure, router } from '#server/trpc';
import { z } from 'zod';

export const testRouter = router({
  getUsers: baseProcedure.query(async () => {
    // db access
    return [10, 20, 30];
  }),

  createUser: baseProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      // db access
      return input.name;
    }),
});
