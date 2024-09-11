import { auth } from '#shared/lib/utils/auth';
import * as styles from './styles.css';
import { BestProducts, RecentProducts } from '#widgets/product';

export default async function Home() {
  const session = await auth();

  return (
    <div className={styles.container}>
      <RecentProducts />
      <BestProducts />
    </div>
  );
}
