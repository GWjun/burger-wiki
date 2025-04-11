'use client';

import { ArrowDownNarrowWide, ArrowUpWideNarrow } from 'lucide-react';
import { useOverlay } from '@toss/use-overlay';

import { FilteredProductsSkeleton, ProductFilter } from '#widgets/product';
import { type ProductOrderType, ProductOrderOptions } from '#entities/product';
import { FilterMenuButton } from '#features/filter';

import { useQueryState } from '#shared/hooks/useQueryState';
import Button from '#shared/ui/Button';
import Modal from '#shared/ui/Modal';

import {
  isValidOrderType,
  isValidSortOrder,
} from '#shared/lib/utils/searchParamsUtils';

import { FilteredProducts } from '../FilteredProducts';
import * as styles from './styles.css';
import { Suspense } from 'react';

export function FilteredSection() {
  const overlay = useOverlay();

  const [rawOrder, setOrder] = useQueryState<ProductOrderType>(
    'order',
    'release',
  );
  const [rawSortOrder, setSortOrder] = useQueryState<'asc' | 'desc'>(
    'sortOrder',
    'desc',
  );

  const order: ProductOrderType = isValidOrderType(rawOrder)
    ? rawOrder
    : 'release';
  const sortOrder: 'asc' | 'desc' = isValidSortOrder(rawSortOrder)
    ? rawSortOrder
    : 'desc';

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
        <Suspense fallback={<FilteredProductsSkeleton />}>
          <FilteredProducts order={order} sortOrder={sortOrder} />
        </Suspense>
      </div>
    </div>
  );
}
