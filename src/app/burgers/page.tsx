import { getHydrationHelpers } from '@server/getHydrationHelpers';

import { Suspense } from 'react';
import { FilteredSection, ProductFilter } from '#widgets/product';
import {
  getSearchParam,
  isValidOrderType,
  isValidSortOrder,
} from '#shared/lib/utils/searchParamsUtils';

import * as styles from './styles.css';

export default async function Burgers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { trpc, HydrateClient } = await getHydrationHelpers();

  const orderParam = await getSearchParam(searchParams, 'order');
  const sortOrderParam = await getSearchParam(searchParams, 'sortOrder');

  const order = isValidOrderType(orderParam) ? orderParam : 'release';
  const sortOrder = isValidSortOrder(sortOrderParam) ? sortOrderParam : 'desc';

  void trpc.brand.getAllBrandsName.prefetch();
  void trpc.product.getFilteredProducts.prefetchInfinite({
    filters: undefined,
    order,
    sortOrder,
    limit: 20,
  });

  return (
    <HydrateClient>
      <div className={styles.container}>
        <div className={styles.hidden}>
          <Suspense fallback={<div className={styles.productFilterFallback} />}>
            <ProductFilter />
          </Suspense>
        </div>

        <FilteredSection />
      </div>
    </HydrateClient>
  );
}
