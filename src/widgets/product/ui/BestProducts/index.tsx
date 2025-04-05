'use client';

import { useEffect } from 'react';

import { ProductList, useBestProducts } from '#entities/product';
import Button from '#shared/ui/Button';
import { useMediaQuery } from '#shared/hooks/useMediaQuery';
import { theme } from '#shared/lib/styles/theme.css';

import * as styles from './styles.css';

export function BestProducts() {
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const { products, fetchNextPage, hasNextPage } = useBestProducts({
    limit: 5,
  });

  // 모바일에서는 15개의 데이터가 한번에 보이도록 함
  useEffect(() => {
    if (isMobile && hasNextPage) {
      fetchNextPage().then(() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      });
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
