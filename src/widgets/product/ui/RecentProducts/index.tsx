'use client';

import { useEffect } from 'react';

import { ProductList, useRecentProducts } from '#entities/product';
import Button from '#shared/ui/Button';
import { useMediaQuery } from '#shared/hooks/useMediaQuery';
import { theme } from '#shared/lib/styles/theme.css';

import * as styles from './styles.css';

export function RecentProducts() {
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const { products, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useRecentProducts({
      limit: 5,
    });

  const TARGET_PRODUCT_COUNT = 15;

  // 모바일 환경이고, 다음 페이지가 있고, 현재 로딩 중이 아니며,
  // 아직 목표 개수(15개)에 도달하지 못했을 때만 다음 페이지 로드
  useEffect(() => {
    const shouldFetch =
      isMobile &&
      hasNextPage &&
      !isFetchingNextPage &&
      products.length < TARGET_PRODUCT_COUNT;

    if (shouldFetch) {
      fetchNextPage();
    }
  }, [isMobile, hasNextPage, isFetchingNextPage, products.length]);

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
