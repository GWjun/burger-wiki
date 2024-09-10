import { ProductCardSkeleton } from '#entities/product';
import { container, productsContainer, products, title } from './styles.css';

export function RecentProductsSkeleton() {
  return (
    <div className={container}>
      <span className={title}>최근 출시 버거</span>
      <div className={productsContainer}>
        <div className={products}>
          <ProductCardSkeleton count={5} />
        </div>
      </div>
    </div>
  );
}
