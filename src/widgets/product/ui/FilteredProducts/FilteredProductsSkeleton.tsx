import { ProductCardSkeleton } from '#entities/product';
import { products } from './styles.css';
import clsx from 'clsx';

export function FilteredProductsSkeleton() {
  return (
    <div className={clsx(products)}>
      <ProductCardSkeleton count={20} />
    </div>
  );
}
