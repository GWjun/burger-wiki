import type { ProductFilterType } from '@server/routers/product/schema';
import type { Patty } from '@prisma/client';
import { create } from 'zustand';

interface ProductFilterState {
  filters: ProductFilterType | undefined;
  updateFilter: (newFilter: ProductFilterType) => void;
  resetFilter: () => void;
  handleArrayChange: <T extends string | Patty>(
    type: 'brand' | 'patty',
    value: T,
  ) => void;
}

export const useProductFilterStore = create<ProductFilterState>((set) => ({
  filters: undefined,

  updateFilter: (newFilter) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilter },
    })),

  resetFilter: () => set({ filters: undefined }),

  handleArrayChange: (type, value) =>
    set((state) => {
      const currentValues =
        type === 'brand'
          ? state.filters?.brands || []
          : state.filters?.pattyTypes || [];

      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      if (type === 'brand') {
        return {
          filters: {
            ...state.filters,
            brands: updatedValues as string[],
          },
        };
      } else {
        return {
          filters: {
            ...state.filters,
            pattyTypes: updatedValues as Patty[],
          },
        };
      }
    }),
}));
