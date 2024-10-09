import { trpc } from '#shared/lib/utils/trpc';
import { useRouter } from 'next/navigation';

export function useBrandLike(brand_id: number) {
  const utils = trpc.useUtils();
  const router = useRouter();

  const { data: isLike, status: queryStatus } =
    trpc.brand.getBrandLike.useQuery({
      brand_id,
    });

  const { mutate, status: mutateStatus } =
    trpc.brand.toggleBrandLike.useMutation({
      onSuccess: () => {
        utils.brand.getBrandLike.invalidate({ brand_id });
        router.refresh();
      },
    });

  return {
    isLike,
    mutate,
    queryStatus,
    mutateStatus,
  };
}
