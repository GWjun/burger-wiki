import { Suspense } from 'react';
import { createAsyncCaller } from '@server/routers';

import { BestBrands } from '#widgets/brand';
import { BestProducts, RecentProducts } from '#widgets/product';
import { serializer } from '#shared/lib/utils/serialization';

import * as styles from './styles.css';

export default async function Home() {
  const trpc = await createAsyncCaller();

  const recentProducts = await trpc.product.getRecentProducts({ limit: 5 });
  const recentProductsProps = serializer.serialize(recentProducts);

  const bestProducts = await trpc.product.getBestProducts({ limit: 5 });
  const bestProductsProps = serializer.serialize(bestProducts);

  return (
    <div className={styles.container}>
      <BestBrands />

      <div className={styles.listContainer}>
        <span className={styles.listTile}>최근 출시 버거</span>
        <Suspense>
          <RecentProducts initialData={recentProductsProps} />
        </Suspense>
      </div>

      <div className={styles.listContainer}>
        <span className={styles.listTile}>인기 버거</span>
        <Suspense>
          <BestProducts initialData={bestProductsProps} />
        </Suspense>
      </div>
    </div>
  );
}
