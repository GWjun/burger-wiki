import type { ProductFilterType } from '@server/routers/product/schema';
import { atom } from 'recoil';

export const productFilterState = atom<ProductFilterType | undefined>({
  key: 'productFilter',
  default: undefined,
});
