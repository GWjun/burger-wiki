'use client';

import { Suspense } from 'react';
import { ArrowDownNarrowWide, ArrowUpWideNarrow } from 'lucide-react';
import {
  type ProductOrderType,
  ProductOrderOptions,
  ProductList,
  useFilteredProducts,
} from '#entities/product';
import { FilterMenuButton } from '#features/filter';
import { useQueryState } from '#shared/hooks/useQueryState';
import LoadingSpinner from '#shared/ui/LoadingSpinner';

import * as styles from './styles.css';

export function BrandProducts({ brand_name_kor }: { brand_name_kor: string }) {
  const [order, setOrder] = useQueryState<ProductOrderType>('order', 'release');
  const [sortOrder, setSortOrder] = useQueryState<'asc' | 'desc'>(
    'sortOrder',
    'desc',
  );

  const { products, ref, isFetchingNextPage } = useFilteredProducts({
    filters: {
      brands: [brand_name_kor],
    },
    order,
    sortOrder,
    limit: 20,
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
          <Suspense>
            <ProductList products={products} />
          </Suspense>
        </div>

        <div ref={ref} />
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
}
