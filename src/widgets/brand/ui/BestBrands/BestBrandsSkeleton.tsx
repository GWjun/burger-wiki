import { BrandCardSkeleton } from '#entities/brand';
import { container, brandsContainer, brands, title } from './styles.css';

export function BestBrandsSkeleton() {
  return (
    <div className={container}>
      <span className={title}>인기 브랜드</span>
      <div className={brandsContainer}>
        <div className={brands}>
          <BrandCardSkeleton count={2} />
        </div>
        <div style={{ height: '38px' }} />
      </div>
    </div>
  );
}
