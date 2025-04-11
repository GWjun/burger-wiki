'use client';

import { BrandCard } from '#entities/brand';
import { trpc } from '#shared/lib/utils/trpc';
import * as styles from './styles.css';

export function BestBrands() {
  const [brands] = trpc.brand.getBestBrands.useSuspenseQuery();

  if (!brands) {
    return <div className={styles.nothing}>표시할 브랜드가 없습니다</div>;
  }

  return (
    <div className={styles.brandsContainer}>
      <div className={styles.brands}>
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </div>
  );
}
