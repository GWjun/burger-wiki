import { createCallerFactory, router } from '#server/trpc';
import { createContext } from '#server/context';

import { userRouter } from '../routers/user';
import { productRouter } from '../routers/product';
import { brandRouter } from '../routers/brand';
import { reviewRouter } from '../routers/review';

export const appRouter = router({
  user: userRouter,
  product: productRouter,
  brand: brandRouter,
  review: reviewRouter,
});

export const createCaller = createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
