'use client';

import type { Brand } from '@prisma/client';
import { use } from 'react';
import { useBestBrands, BrandCard } from '#entities/brand';
import * as styles from './styles.css';

export function BestBrands({
  initialPromise,
}: {
  initialPromise: Promise<Brand[]>;
}) {
  const initialData = use(initialPromise);

  const { data: brands } = useBestBrands({ initialData });

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
