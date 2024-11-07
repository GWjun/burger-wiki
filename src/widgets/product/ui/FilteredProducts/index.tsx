'use client';

import { ArrowDownNarrowWide, ArrowUpWideNarrow } from 'lucide-react';
import { useOverlay } from '@toss/use-overlay';

import { ProductFilter } from '#widgets/product';
import {
  type ProductOrderType,
  ProductOrderOptions,
  ProductList,
  ProductCardSkeleton,
  useFilteredProducts,
  useProductFilter,
} from '#entities/product';
import { FilterMenuButton } from '#features/filter';

import { useMediaQuery } from '#shared/hooks/useMediaQuery';
import { useQueryState } from '#shared/hooks/useQueryState';
import { theme } from '#shared/lib/styles/theme.css';
import LoadingSpinner from '#shared/ui/LoadingSpinner';
import Button from '#shared/ui/Button';
import Modal from '#shared/ui/Modal';

import * as styles from './styles.css';

export function FilteredProducts() {
  const overlay = useOverlay();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const [order, setOrder] = useQueryState<ProductOrderType>('order', 'release');
  const [sortOrder, setSortOrder] = useQueryState<'asc' | 'desc'>(
    'sortOrder',
    'desc',
  );

  const { filters } = useProductFilter();
  const { products, status, ref, isFetchingNextPage } = useFilteredProducts({
    filters,
    order,
    sortOrder,
    limit: isMobile ? 10 : 20,
  });

  function openModal() {
    return overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} onClose={close}>
        <ProductFilter />
      </Modal>
    ));
  }

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
        <Button
          onClick={openModal}
          variant="outline"
          className={styles.filterButton}
        >
          필터
        </Button>
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
