import { prisma } from '#server/prisma';
import { baseProcedure, router } from '#server/trpc';

export const userRouter = router({
  getUsers: baseProcedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),
});
