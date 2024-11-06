import { FilteredProducts, ProductFilter } from '#widgets/product';
import * as styles from './styles.css';

export default function Burgers() {
  return (
    <div className={styles.container}>
      <ProductFilter />
      <FilteredProducts />
    </div>
  );
}
