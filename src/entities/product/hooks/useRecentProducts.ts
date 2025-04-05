import type { Product } from '@prisma/client';

import { flatMap } from 'es-toolkit';
import { trpc } from '#shared/lib/utils/trpc';

export function useRecentProducts({ limit }: { limit?: number }) {
  const [data, helpers] =
    trpc.product.getRecentProducts.useSuspenseInfiniteQuery(
      { limit },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const products = flatMap(data.pages, (page) => page.data) as Product[];

  return { products, ...helpers };
}
