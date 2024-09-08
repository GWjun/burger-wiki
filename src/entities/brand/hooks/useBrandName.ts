import { trpc } from '#shared/lib/utils/trpc';

export function useBrandName(id: number) {
  const brandNameQuery = trpc.brand.getBrandNameById.useQuery({ id });

  return {
    data: brandNameQuery.data,
    status: brandNameQuery.status,
    error: brandNameQuery.error,
    refetch: brandNameQuery.refetch,
  };
}
