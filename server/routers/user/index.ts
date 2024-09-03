import { prisma } from '#server/prisma';
import { baseProcedure, router } from '#server/trpc';

export const userRouter = router({
  getUsers: baseProcedure.query(async () => {
    const users = await prisma.user.findMany();
    // throw new AppError('INTERNAL_SERVER_ERROR', '안녕');
    // throw new Error('aa');
    return users;
  }),
});
