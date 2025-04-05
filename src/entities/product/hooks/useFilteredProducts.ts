import type { ProductFilterType } from '@server/routers/product/schema';
import type { ProductOrderType } from '#entities/product';
import type { Product } from '@prisma/client';

import { trpc } from '#shared/lib/utils/trpc';
import { flatMap } from 'es-toolkit';
import { useInView } from 'react-intersection-observer';
import { useCallback } from 'react';

export function useFilteredProducts({
  filters,
  order,
  sortOrder,
  limit,
}: {
  filters?: ProductFilterType;
  order?: ProductOrderType;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
}) {
  const [data, helpers] =
    trpc.product.getFilteredProducts.useSuspenseInfiniteQuery(
      { filters, order, sortOrder, limit },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const { fetchNextPage, hasNextPage, isFetchingNextPage } = helpers;
  const products = flatMap(data.pages, (page) => page.data) as Product[];

  const { ref } = useInView({
    onChange: useCallback(
      (inView: boolean) => {
        if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
      },
      [fetchNextPage, hasNextPage, isFetchingNextPage],
    ),
  });

  return {
    products,
    ref,
    ...helpers,
  };
}
