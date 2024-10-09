import { trpc } from '#shared/lib/utils/trpc';
import { AppError } from '#error/error';

export function useBestBrands() {
  const result = trpc.brand.getBestBrands.useQuery();

  if (result.status === 'error') {
    throw new AppError('NOT_FOUND', '브랜드가 존재하지 않습니다.');
  }

  return result;
}
