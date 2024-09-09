'use client';

import {
  ProductCard,
  ProductCardSkeleton,
  useRecentProducts,
} from '#entities/product';
import * as styles from './styles.css';

interface ProductListProps {
  listName: string;
}

export function ProductList({ listName }: ProductListProps) {
  const { data: products, status } = useRecentProducts();

  if (status !== 'pending' && !products)
    return <div className={styles.nothing}>표시할 상품이 없습니다</div>;

  return (
    <div className={styles.container}>
      <span className={styles.listName}>{listName}</span>
      <div className={styles.products}>
        {status === 'pending' ? (
          <ProductCardSkeleton count={5} />
        ) : (
          products.map((product) => (
            <ProductCard product={product} key={product.product_id} />
          ))
        )}
      </div>
    </div>
  );
}
