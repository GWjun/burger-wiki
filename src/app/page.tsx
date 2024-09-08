import { ProductList } from '#widgets/Product';
import { auth } from '#shared/lib/utils/auth';
import * as styles from './styles.css';

export default async function Home() {
  const session = await auth();

  return (
    <div className={styles.container}>
      <ProductList />
    </div>
  );
}
