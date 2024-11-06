'use client';

import { ListRestart } from 'lucide-react';
import {
  useProductFilter,
  pattyNameMap,
  pattyTypesList,
} from '#entities/product';
import { trpc } from '#shared/lib/utils/trpc';
import Label from '#shared/ui/Label';
import Button from '#shared/ui/Button';

import { ProductFilterSkeleton } from './ProductFilterSkeleton';
import * as styles from './styles.css';

export function ProductFilter() {
  const { data: brandsList, status } = trpc.brand.getAllBrandsName.useQuery();
  const { filters, handleArrayChange, resetFilter } = useProductFilter();

  if (status === 'pending') return <ProductFilterSkeleton />;
  if (!brandsList) return null;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h3>필터</h3>
        <Button
          variant="text"
          onClick={() => resetFilter()}
          className={styles.reset}
        >
          <ListRestart size={18} />
          전체 초기화
        </Button>
      </div>

      <div className={styles.filter}>
        <h4 className={styles.filterName}>브랜드</h4>
        <div className={styles.options}>
          {brandsList.map((brand) => (
            <Label key={brand} className={styles.label}>
              <input
                type="checkbox"
                checked={filters?.brands?.includes(brand) || false}
                onChange={() => handleArrayChange('brand', brand)}
                className={styles.checkbox}
              />
              {brand}
            </Label>
          ))}
        </div>
      </div>

      <div className={styles.filter}>
        <h4 className={styles.filterName}>패티</h4>
        <div className={styles.options}>
          {pattyTypesList.map((patty) => (
            <Label key={patty} className={styles.label}>
              <input
                type="checkbox"
                checked={filters?.pattyTypes?.includes(patty) || false}
                onChange={() => handleArrayChange('patty', patty)}
                className={styles.checkbox}
              />
              {pattyNameMap[patty]}
            </Label>
          ))}
        </div>
      </div>
    </div>
  );
}
