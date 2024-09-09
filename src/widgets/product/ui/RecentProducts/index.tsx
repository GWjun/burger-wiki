'use client';

import {
  containerStyle,
  titleStyle,
  ProductList,
  ProductListSkeleton,
  useRecentProducts,
} from '#entities/product';
import Button from '#shared/ui/Button';
import * as styles from './styles.css';

export function RecentProducts() {
  const { data, status, fetchNextPage, hasNextPage } = useRecentProducts({
    limit: 5,
  });

  if (status === 'pending') {
    return <ProductListSkeleton title="최근 출시 버거" />;
  }

  return (
    <div className={containerStyle}>
      <span className={titleStyle}>최근 출시 버거</span>

      <div className={styles.container}>
        <div className={styles.products}>
          {data?.pages.map((page, index) => (
            <ProductList key={index} products={page.products} />
          ))}
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
