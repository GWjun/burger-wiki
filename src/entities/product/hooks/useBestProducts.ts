import type { Product } from '@prisma/client';

import { trpc } from '#shared/lib/utils/trpc';
import { flatMap } from 'es-toolkit';

export function useBestProducts({ limit }: { limit?: number }) {
  const [data, helpers] = trpc.product.getBestProducts.useSuspenseInfiniteQuery(
    { limit },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const products = flatMap(data.pages, (page) => page.data) as Product[];

  return { products, ...helpers };
}
