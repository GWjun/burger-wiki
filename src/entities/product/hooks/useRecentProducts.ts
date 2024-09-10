import { trpc } from '#shared/lib/utils/trpc';

export function useRecentProducts({ limit }: { limit?: number }) {
  const result = trpc.product.getRecentProducts.useInfiniteQuery(
    { limit },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const { data, ...rest } = result;
  const products = result.data?.pages.flatMap((page) => page.products) || [];

  return { products, ...rest };
}
