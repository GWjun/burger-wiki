import { createCallerFactory, router } from '#server/trpc';
import { createContext } from '#server/context';

import { userRouter } from '../routers/user';
import { productRouter } from '../routers/product';
import { brandRouter } from '../routers/brand';

export const appRouter = router({
  user: userRouter,
  product: productRouter,
  brand: brandRouter,
});

export const createCaller = createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
