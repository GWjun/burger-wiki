import type { ProductFilterType } from '@server/routers/product/schema';
import type { ProductOrderType } from '#entities/product';

import { trpc } from '#shared/lib/utils/trpc';
import { flatMap } from 'es-toolkit';
import { Product } from '@prisma/client';
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
  const result = trpc.product.getFilteredProducts.useInfiniteQuery(
    { filters, order, sortOrder, limit },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const { data, ...rest } = result;
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = rest;
  const products = flatMap(
    data?.pages || [],
    (page) => page.products,
  ) as Product[];

  const { ref } = useInView({
    onChange: useCallback(
      (inView: boolean) => {
        if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
      },
      [fetchNextPage, hasNextPage, isFetchingNextPage],
    ),
  });

  return { products, ref, ...rest };
}
