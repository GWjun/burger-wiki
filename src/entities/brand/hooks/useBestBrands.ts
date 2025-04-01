import type { Brand } from '@prisma/client';
import { trpc } from '#shared/lib/utils/trpc';
import { AppError } from '@error/error';

export function useBestBrands({ initialData }: { initialData: Brand[] }) {
  const result = trpc.brand.getBestBrands.useQuery(undefined, { initialData });

  if (result.status === 'error') {
    throw new AppError('NOT_FOUND', '브랜드가 존재하지 않습니다.');
  }

  return result;
}
