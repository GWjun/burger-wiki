import { trpc } from '#shared/lib/utils/trpc';
import { flatMap } from 'es-toolkit';
import { Product } from '@prisma/client';
import { useInView } from 'react-intersection-observer';
import { useCallback } from 'react';
import type { BrandProductOrderType } from '#entities/product';

export function useBrandProducts({
  brand_name_kor,
  order,
  sortOrder,
  limit,
}: {
  brand_name_kor: string;
  order?: BrandProductOrderType;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
}) {
  const result = trpc.product.getBrandProducts.useInfiniteQuery(
    { brand_name_kor, order, sortOrder, limit },
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
