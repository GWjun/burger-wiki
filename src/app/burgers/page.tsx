import { createAsyncCaller } from '@server/routers';

import { Suspense } from 'react';
import { FilteredProducts, ProductFilter } from '#widgets/product';
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
  const trpc = await createAsyncCaller();

  const orderParam = await getSearchParam(searchParams, 'order');
  const sortOrderParam = await getSearchParam(searchParams, 'sortOrder');

  const order = isValidOrderType(orderParam) ? orderParam : 'release';
  const sortOrder = isValidSortOrder(sortOrderParam) ? sortOrderParam : 'desc';

  const allBrandsNamePromise = trpc.brand.getAllBrandsName();
  const filteredProductsPromise = trpc.product.getFilteredProducts({
    filters: undefined,
    order,
    sortOrder,
  });

  return (
    <div className={styles.container}>
      <div className={styles.hidden}>
        <Suspense>
          <ProductFilter initialPromise={allBrandsNamePromise} />
        </Suspense>
      </div>

      <Suspense>
        <FilteredProducts initialPromise={filteredProductsPromise} />
      </Suspense>
    </div>
  );
}
