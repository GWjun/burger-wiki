import { ProductCardSkeleton } from '../ProductCardSkeleton';
// temp
import { products } from '#widgets/product/ui/RecentProducts/styles.css';
import * as styles from './styles.css';

interface ProductListSkeletonProps {
  title?: string;
}

export function ProductListSkeleton({ title }: ProductListSkeletonProps) {
  return (
    <div className={styles.containerStyle}>
      <span className={styles.titleStyle}>{title}</span>
      <div className={products}>
        <ProductCardSkeleton count={5} />
      </div>
    </div>
  );
}
