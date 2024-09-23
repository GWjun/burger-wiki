import { ProductCardSkeleton } from '#entities/product';
import { container, productsContainer, products, title } from './styles.css';

export function BestProductsSkeleton() {
  return (
    <div className={container}>
      <span className={title}>인기 버거</span>
      <div className={productsContainer}>
        <div className={products}>
          <ProductCardSkeleton count={5} />
        </div>
        <div style={{ height: '38px' }} />
      </div>
    </div>
  );
}
