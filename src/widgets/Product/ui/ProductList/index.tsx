'use client';

import { ProductCard, useRecentProducts } from '#entities/product';
import * as styles from './styles.css';

export function ProductList() {
  const { data: products, status } = useRecentProducts();

  if (status === 'pending')
    return (
      <div className={styles.container}>
        {Array.from({ length: 2 }).map((_, idx) => (
          <ProductCard product={null} key={idx} />
        ))}
      </div>
    );

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <ProductCard product={product} key={product.product_id} />
      ))}
    </div>
  );
}
