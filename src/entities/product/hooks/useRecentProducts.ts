import { trpc } from '#shared/lib/utils/trpc';
import { flatMap } from 'es-toolkit';
import { Product } from '@prisma/client';

export function useRecentProducts({ limit }: { limit?: number }) {
  const result = trpc.product.getRecentProducts.useInfiniteQuery(
    { limit },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const { data, ...rest } = result;
  const products = flatMap(
    data?.pages || [],
    (page) => page.products,
  ) as Product[];

  return { products, ...rest };
}
