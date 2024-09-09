import { trpc } from '#shared/lib/utils/trpc';

export function useRecentProducts() {
  return trpc.product.getRecentProducts.useQuery();
}
