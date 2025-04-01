import type { ProductPagination } from '#shared/lib/types/paginate';
import type { Product } from '@prisma/client';

import { flatMap } from 'es-toolkit';
import { trpc } from '#shared/lib/utils/trpc';

export function useRecentProducts({
  limit,
  initialData,
}: {
  limit?: number;
  initialData: ProductPagination;
}) {
  const result = trpc.product.getRecentProducts.useInfiniteQuery(
    { limit },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialData: {
        pageParams: [null],
        pages: [initialData],
      },
    },
  );

  const { data, ...rest } = result;
  const products = flatMap(data?.pages || [], (page) => page.data) as Product[];

  return { products, ...rest };
}
