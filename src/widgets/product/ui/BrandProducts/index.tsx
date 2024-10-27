'use client';

import { ProductList, useBrandProducts } from '#entities/product';
import { useMediaQuery } from '#shared/hooks/useMediaQuery';
import { theme } from '#shared/lib/styles/theme.css';
import LoadingSpinner from '#shared/ui/LoadingSpinner';

import { BrandProductsSkeleton } from './BrandProductsSkeleton';
import * as styles from './styles.css';

export function BrandProducts({ brand_name_kor }: { brand_name_kor: string }) {
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const { products, status, ref, isFetchingNextPage } = useBrandProducts({
    brand_name_kor,
    limit: isMobile ? 10 : 20,
  });

  if (status === 'pending') {
    return <BrandProductsSkeleton />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.productsContainer}>
        <div className={styles.products}>
          <ProductList products={products} />
        </div>

        <div ref={ref} />
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
}
