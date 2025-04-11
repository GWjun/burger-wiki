import { Suspense } from 'react';

import { getHydrationHelpers } from '@server/getHydrationHelpers';
import { BestBrands } from '#widgets/brand';
import { BestProducts, RecentProducts } from '#widgets/product';

import * as styles from './styles.css';

export default async function Home() {
  const { trpc, HydrateClient } = await getHydrationHelpers();

  void trpc.brand.getBestBrands.prefetch();
  void trpc.product.getRecentProducts.prefetchInfinite({ limit: 5 });
  void trpc.product.getBestProducts.prefetchInfinite({ limit: 5 });

  return (
    <HydrateClient>
      <div className={styles.container}>
        <div className={styles.brandsContainer}>
          <span className={styles.listTile}>인기 브랜드</span>
          <Suspense fallback={<div className={styles.brandsFallback} />}>
            <BestBrands />
          </Suspense>
        </div>

        <div className={styles.productsContainer}>
          <span className={styles.listTile}>최근 출시 버거</span>
          <Suspense fallback={<div className={styles.productsFallback} />}>
            <RecentProducts />
          </Suspense>
        </div>

        <div className={styles.productsContainer}>
          <span className={styles.listTile}>인기 버거</span>
          <Suspense fallback={<div className={styles.productsFallback} />}>
            <BestProducts />
          </Suspense>
        </div>
      </div>
    </HydrateClient>
  );
}
