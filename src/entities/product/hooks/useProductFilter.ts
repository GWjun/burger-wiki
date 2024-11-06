import type { ProductFilterType } from '#server/routers/product/schema';
import { Patty } from '@prisma/client';
import { useRecoilState } from 'recoil';
import { productFilterState } from '#entities/product/recoil/atoms';

export function useProductFilter() {
  const [filters, setFilters] = useRecoilState<ProductFilterType | undefined>(
    productFilterState,
  );

  function updateFilter(newFilter: ProductFilterType) {
    setFilters((prev) => ({ ...prev, ...newFilter }));
  }

  function resetFilter() {
    setFilters(undefined);
  }

  function handleArrayChange<T extends string | Patty>(
    type: 'brand' | 'patty',
    value: T,
  ) {
    const currentValues =
      type === 'brand' ? filters?.brands || [] : filters?.pattyTypes || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    if (type === 'brand') {
      updateFilter({ brands: updatedValues as string[] });
    } else {
      updateFilter({ pattyTypes: updatedValues as Patty[] });
    }
  }

  return {
    filters,
    resetFilter,
    handleArrayChange,
  };
}
