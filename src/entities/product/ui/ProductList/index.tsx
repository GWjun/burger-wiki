import type { Product } from '@prisma/client';
import { ProductCard } from '../ProductCard';
import * as styles from './styles.css';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  if (!products) {
    return <div className={styles.nothing}>표시할 상품이 없습니다</div>;
  }

  return products.map((product) => (
    <ProductCard product={product} key={product.product_id} />
  ));
}
