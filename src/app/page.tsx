import { BestBrands } from '#widgets/brand';
import { BestProducts, RecentProducts } from '#widgets/product';
import * as styles from './styles.css';

export default async function Home() {
  return (
    <div className={styles.container}>
      {/*<BestBrands />*/}
      <RecentProducts />
      <BestProducts />
    </div>
  );
}
