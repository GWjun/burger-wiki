import { prisma } from '#server/prisma';
import { baseProcedure, router } from '#server/trpc';
import { z } from 'zod';

export const usersRouter = router({
  getUsers: baseProcedure.query(async () => {
    const users = await prisma.users.findMany();
    return users;
  }),

  createUser: baseProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const newUser = await prisma.users.create({
        data: {
          username: input.username,
          email: input.email,
          password: input.password,
        },
      });
      return newUser;
    }),
});
