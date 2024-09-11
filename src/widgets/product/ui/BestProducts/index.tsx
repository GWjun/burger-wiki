'use client';

import { ProductList, useBestProducts } from '#entities/product';
import Button from '#shared/ui/Button';
import { useMediaQuery } from '#shared/hooks/useMediaQuery';
import { theme } from '#shared/lib/styles/theme.css';

import { BestProductsSkeleton } from './BestProductsSkeleton';
import * as styles from './styles.css';

export function BestProducts() {
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const { products, status, fetchNextPage, hasNextPage } = useBestProducts({
    limit: isMobile ? 15 : 5,
  });

  if (status === 'pending') {
    return <BestProductsSkeleton />;
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>인기 버거</span>

      <div className={styles.productsContainer}>
        <div className={styles.products}>
          <ProductList products={products} />
        </div>

        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} variant="outline">
            더보기
          </Button>
        )}
      </div>
    </div>
  );
}
