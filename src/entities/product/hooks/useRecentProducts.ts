import { trpc } from '#shared/lib/utils/trpc';

export function useRecentProducts() {
  const productsQuery = trpc.product.getRecentProducts.useQuery();

  return {
    data: productsQuery.data ?? [],
    status: productsQuery.status,
    error: productsQuery.error,
    refetch: productsQuery.refetch,
  };
}
