import type { Nutrition } from '@prisma/client';

export interface NutritionMapping {
  key: keyof Omit<Nutrition, 'product_id' | 'created_at'>;
  name: string;
  unit: string;
}

export const nutritionMap: NutritionMapping[] = [
  { key: 'calories', name: '칼로리', unit: 'kcal' },
  { key: 'protein', name: '단백질', unit: 'g' },
  { key: 'fat', name: '지방', unit: 'g' },
  { key: 'sugar', name: '당류', unit: 'g' },
  { key: 'sodium', name: '나트륨', unit: 'mg' },
];
