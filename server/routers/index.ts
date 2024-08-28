import { createCallerFactory, router } from '#server/trpc';
import { createContext } from '#server/context';

import { usersRouter } from 'server/routers/users';

export const appRouter = router({
  users: usersRouter,
});

export const createCaller = createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
