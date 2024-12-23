'use client';

import { ArrowDownNarrowWide, ArrowUpWideNarrow } from 'lucide-react';
import {
  type ProductOrderType,
  ProductOrderOptions,
  ProductList,
  ProductCardSkeleton,
  useFilteredProducts,
} from '#entities/product';
import { FilterMenuButton } from '#features/filter';

import { useMediaQuery } from '#shared/hooks/useMediaQuery';
import { useQueryState } from '#shared/hooks/useQueryState';
import { theme } from '#shared/lib/styles/theme.css';
import LoadingSpinner from '#shared/ui/LoadingSpinner';

import * as styles from './styles.css';

export function BrandProducts({ brand_name_kor }: { brand_name_kor: string }) {
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const [order, setOrder] = useQueryState<ProductOrderType>('order', 'release');
  const [sortOrder, setSortOrder] = useQueryState<'asc' | 'desc'>(
    'sortOrder',
    'desc',
  );

  const { products, status, ref, isFetchingNextPage } = useFilteredProducts({
    filters: {
      brands: [brand_name_kor],
    },
    order,
    sortOrder,
    limit: isMobile ? 10 : 20,
  });

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <FilterMenuButton
          filter={order}
          setFilter={setOrder}
          options={ProductOrderOptions}
        />
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          aria-label={sortOrder === 'asc' ? '내림차순' : '오름차순'}
          className={styles.sortOrderButton}
        >
          {sortOrder === 'asc' ? (
            <ArrowUpWideNarrow size={18} />
          ) : (
            <ArrowDownNarrowWide size={18} />
          )}
        </button>
      </div>

      <div className={styles.productsContainer}>
        <div className={styles.products}>
          {status === 'pending' ? (
            <ProductCardSkeleton count={20} />
          ) : (
            <ProductList products={products} />
          )}
        </div>

        <div ref={ref} />
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
}
