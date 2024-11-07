import { FilteredProducts, ProductFilter } from '#widgets/product';
import * as styles from './styles.css';

export default function Burgers() {
  return (
    <div className={styles.container}>
      <div className={styles.hidden}>
        <ProductFilter />
      </div>
      <FilteredProducts />
    </div>
  );
}
