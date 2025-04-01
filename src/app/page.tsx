import { Suspense } from 'react';
import { createAsyncCaller } from '@server/routers';

import { BestBrands } from '#widgets/brand';
import { BestProducts, RecentProducts } from '#widgets/product';

import * as styles from './styles.css';

export default async function Home() {
  const trpc = await createAsyncCaller();

  const bestBrandsPromise = trpc.brand.getBestBrands();
  const recentProductsPromise = trpc.product.getRecentProducts({ limit: 5 });
  const bestProductsPromise = trpc.product.getBestProducts({ limit: 5 });

  return (
    <div className={styles.container}>
      <div className={styles.brandsContainer}>
        <span className={styles.listTile}>인기 브랜드</span>
        <Suspense fallback={<div className={styles.brandsFallback} />}>
          <BestBrands initialPromise={bestBrandsPromise} />
        </Suspense>
      </div>

      <div className={styles.productsContainer}>
        <span className={styles.listTile}>최근 출시 버거</span>
        <Suspense fallback={<div className={styles.productsFallback} />}>
          <RecentProducts initialPromise={recentProductsPromise} />
        </Suspense>
      </div>

      <div className={styles.productsContainer}>
        <span className={styles.listTile}>인기 버거</span>
        <Suspense fallback={<div className={styles.productsFallback} />}>
          <BestProducts initialPromise={bestProductsPromise} />
        </Suspense>
      </div>
    </div>
  );
}
