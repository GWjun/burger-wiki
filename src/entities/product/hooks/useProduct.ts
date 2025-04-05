import { trpc } from '#shared/lib/utils/trpc';

import { AppError } from '@error/AppError';

export function useProduct(product_id: number) {
  const result = trpc.product.getProductById.useQuery({ product_id });

  if (result.status === 'error') {
    throw new AppError('NOT_FOUND', '버거가 존재하지 않습니다.');
  }

  return result;
}
