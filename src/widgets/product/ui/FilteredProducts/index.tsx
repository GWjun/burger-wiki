import {
  type ProductOrderType,
  ProductList,
  useFilteredProducts,
  useProductFilterStore,
} from '#entities/product';
import LoadingSpinner from '#shared/ui/LoadingSpinner';

import * as styles from './styles.css';

export function FilteredProducts({
  order,
  sortOrder,
}: {
  order: ProductOrderType;
  sortOrder: 'asc' | 'desc';
}) {
  const { filters } = useProductFilterStore();

  const { products, ref, isFetchingNextPage } = useFilteredProducts({
    filters,
    order,
    sortOrder,
    limit: 20,
  });

  return (
    <>
      <div className={styles.products}>
        <ProductList products={products} />
      </div>

      <div ref={ref} />
      {isFetchingNextPage && <LoadingSpinner />}
    </>
  );
}
