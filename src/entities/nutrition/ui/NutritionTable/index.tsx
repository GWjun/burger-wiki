import type { Nutrition } from '@prisma/client';
import React from 'react';
import { nutritionMap } from '../../model/NutritionMap';
import * as styles from './styles.css';

interface NutritionTableProps {
  nutrition_info: Nutrition;
}

export const NutritionTable: React.FC<NutritionTableProps> = ({
  nutrition_info,
}) => {
  function formatValue(value: number | null) {
    if (value === null) return '-';
    return value.toLocaleString();
  }

  return (
    <div className={styles.container}>
      <table className={styles.table} aria-label="영양정보">
        <thead>
          <tr>
            <th className={styles.tableHeaderLeft}>영양소</th>
            <th className={styles.tableHeaderRight}>함량</th>
          </tr>
        </thead>
        <tbody>
          {nutritionMap.map(({ key, name, unit }) => (
            <tr key={key} className={styles.row}>
              <td className={styles.nameCell}>{name}</td>
              <td className={styles.valueCell}>
                {nutrition_info[key]
                  ? `${formatValue(Number(nutrition_info[key]))} ${unit}`
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
