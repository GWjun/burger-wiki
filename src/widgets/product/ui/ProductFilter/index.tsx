'use client';

import { use } from 'react';
import { ListRestart } from 'lucide-react';
import {
  pattyNameMap,
  pattyTypesList,
  useProductFilterStore,
} from '#entities/product';
import { trpc } from '#shared/lib/utils/trpc';
import Label from '#shared/ui/Label';
import Button from '#shared/ui/Button';

import * as styles from './styles.css';

export function ProductFilter({
  initialPromise,
}: {
  initialPromise?: Promise<string[]>;
}) {
  let initialData: string[] | undefined;
  if (initialPromise) {
    initialData = use(initialPromise);
  }

  const { data: brandsList } = trpc.brand.getAllBrandsName.useQuery(undefined, {
    initialData,
  });
  const { filters, updateFilter, handleArrayChange, resetFilter } =
    useProductFilterStore();

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

      <div className={styles.filter}>
        <h4 className={styles.filterName}>칼로리</h4>
        <div className={styles.options}>
          <Label className={styles.label}>
            <input
              type="radio"
              value="400 이하"
              checked={filters?.calories?.max === 400}
              onChange={() => updateFilter({ calories: { max: 400 } })}
              className={styles.radio}
            />
            400 이하
          </Label>
          <Label className={styles.label}>
            <input
              type="radio"
              value="800 이상"
              checked={filters?.calories?.min === 800}
              onChange={() => updateFilter({ calories: { min: 800 } })}
              className={styles.radio}
            />
            800 이상
          </Label>
          <Label className={styles.label}>
            <input
              type="radio"
              value="선택 안함"
              checked={!filters?.calories}
              onChange={() => updateFilter({ calories: undefined })}
              className={styles.radio}
            />
            선택 안함
          </Label>
        </div>
      </div>
    </div>
  );
}
