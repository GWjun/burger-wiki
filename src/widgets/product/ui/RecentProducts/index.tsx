'use client';

import type { ProductPagination } from '#shared/lib/types/paginate';
import { use, useEffect } from 'react';

import { ProductList, useRecentProducts } from '#entities/product';
import Button from '#shared/ui/Button';
import { useMediaQuery } from '#shared/hooks/useMediaQuery';
import { theme } from '#shared/lib/styles/theme.css';

import * as styles from './styles.css';

export function RecentProducts({
  initialPromise,
}: {
  initialPromise: Promise<ProductPagination>;
}) {
  const initialData = use(initialPromise);

  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const { products, fetchNextPage, hasNextPage } = useRecentProducts({
    limit: isMobile ? 15 : 5,
    initialData,
  });

  useEffect(() => {
    if (isMobile && hasNextPage) {
      fetchNextPage();
    }
  }, [isMobile, hasNextPage]);

  return (
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
  );
}
