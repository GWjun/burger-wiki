import { trpc } from '#shared/lib/utils/trpc';

export function useBrandName(id: number) {
  return trpc.brand.getBrandNameById.useQuery({ id });
}
