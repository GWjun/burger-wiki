import { createCallerFactory, router } from '#server/trpc';
import { createContext } from '#server/context';

import { userRouter } from 'server/routers/user';

export const appRouter = router({
  user: userRouter,
});

export const createCaller = createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
