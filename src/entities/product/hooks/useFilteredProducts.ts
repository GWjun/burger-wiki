import type { ProductFilterType } from '@server/routers/product/schema';
import type { ProductOrderType } from '#entities/product';
import type { ProductPagination } from '#shared/lib/types/paginate';
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
  initialData,
}: {
  filters?: ProductFilterType;
  order?: ProductOrderType;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  initialData: ProductPagination;
}) {
  const result = trpc.product.getFilteredProducts.useInfiniteQuery(
    { filters, order, sortOrder, limit },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // 유저 인터랙션에 대해서 바로 반응하기 위해 palceholderData로 설정
      placeholderData: {
        pageParams: [null],
        pages: [initialData],
      },
    },
  );

  const { data, ...rest } = result;
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = rest;
  const products = flatMap(data?.pages || [], (page) => page.data) as Product[];

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
