'use client';

import type { ProductPagination } from '#shared/lib/types/paginate';
import { useEffect } from 'react';

import { ProductList, useRecentProducts } from '#entities/product';
import Button from '#shared/ui/Button';
import { useMediaQuery } from '#shared/hooks/useMediaQuery';
import { theme } from '#shared/lib/styles/theme.css';
import { serializer } from '#shared/lib/utils/serialization';

import * as styles from './styles.css';

export function RecentProducts({ initialData }: { initialData: string }) {
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const { products, fetchNextPage, hasNextPage } = useRecentProducts({
    limit: isMobile ? 15 : 5,
    initialData: serializer.deserialize<ProductPagination>(initialData),
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
