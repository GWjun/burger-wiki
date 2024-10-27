import { ProductCardSkeleton } from '#entities/product';
import { container, productsContainer, products } from './styles.css';

export function BrandProductsSkeleton() {
  return (
    <div className={container}>
      <div className={productsContainer}>
        <div className={products}>
          <ProductCardSkeleton count={20} />
        </div>
        <div style={{ height: '38px' }} />
      </div>
    </div>
  );
}
