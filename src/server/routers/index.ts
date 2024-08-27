import { createCallerFactory, router } from '../trpc';
import { createContext } from '../context';
import { testRouter } from './test';

export const appRouter = router({
  test: testRouter,
});

export const createCaller = createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
