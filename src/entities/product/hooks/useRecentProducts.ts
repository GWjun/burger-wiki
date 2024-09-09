import { trpc } from '#shared/lib/utils/trpc';

export function useRecentProducts({ limit }: { limit?: number }) {
  return trpc.product.getRecentProducts.useInfiniteQuery(
    { limit },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
}
