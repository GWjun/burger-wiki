'use client';

import { ProductList, useRecentProducts } from '#entities/product';
import Button from '#shared/ui/Button';
import { useMediaQuery } from '#shared/hooks/useMediaQuery';
import { theme } from '#shared/lib/styles/theme.css';

import { RecentProductsSkeleton } from './index.skeleton';
import * as styles from './styles.css';

export function RecentProducts() {
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const { products, status, fetchNextPage, hasNextPage } = useRecentProducts({
    limit: isMobile ? 15 : 5,
  });

  if (status === 'pending') {
    return <RecentProductsSkeleton />;
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>최근 출시 버거</span>

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
