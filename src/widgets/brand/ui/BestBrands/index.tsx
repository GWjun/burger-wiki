'use client';

import { useBestBrands, BrandCard } from '#entities/brand';
import { BestBrandsSkeleton } from './BestBrandsSkeleton';
import * as styles from './styles.css';

export function BestBrands() {
  const { data: brands, status } = useBestBrands();

  if (status === 'pending') {
    return <BestBrandsSkeleton />;
  }

  if (!brands) {
    return <div className={styles.nothing}>표시할 브랜드가 없습니다</div>;
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>인기 브랜드</span>

      <div className={styles.brandsContainer}>
        <div className={styles.brands}>
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
}
