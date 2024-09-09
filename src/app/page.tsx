import { ProductList } from 'src/widgets/product';
import { auth } from '#shared/lib/utils/auth';
import * as styles from './styles.css';

export default async function Home() {
  const session = await auth();

  return (
    <div className={styles.container}>
      <ProductList listName="최근 출시 버거" />
    </div>
  );
}
