import { prisma } from '#server/prisma';
import { baseProcedure, router } from '#server/trpc';
// import { getErrorMessage } from '#error/error';

export const userRouter = router({
  getUsers: baseProcedure.query(async () => {
    const users = await prisma.user.findMany();
    // throw new Error(getErrorMessage('INTERNAL_SERVER_ERROR'));
    return users;
  }),
});
