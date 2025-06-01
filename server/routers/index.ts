import { createCallerFactory, router } from '@server/trpc';
import { createContext } from '@server/context';
import { notFound } from 'next/navigation';

import { userRouter } from '../routers/user';
import { productRouter } from '../routers/product';
import { brandRouter } from '../routers/brand';
import { reviewRouter } from '../routers/review';
import { nutritionRouter } from '../routers/nutrition';

export const appRouter = router({
  user: userRouter,
  product: productRouter,
  brand: brandRouter,
  review: reviewRouter,
  nutrition: nutritionRouter,
});

export const createCaller = createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context, {
    onError: ({ error }) => {
      if (error.code === 'NOT_FOUND') notFound();
      throw error;
    },
  });
};

export type AppRouter = typeof appRouter;
