import type { ProductPagination } from '#shared/lib/types/paginate';
import type { Product } from '@prisma/client';

import { trpc } from '#shared/lib/utils/trpc';
import { flatMap } from 'es-toolkit';

export function useBestProducts({
  limit,
  initialData,
}: {
  limit?: number;
  initialData: ProductPagination;
}) {
  const result = trpc.product.getBestProducts.useInfiniteQuery(
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
