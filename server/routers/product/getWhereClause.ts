import { ProductFilterType } from '@server/routers/product/schema';

export default function getWhereClause(filters?: ProductFilterType) {
  if (!filters) return {};

  const where: any = {};
  const AND: any[] = [];

  if (filters.brands?.length) {
    AND.push({ brand_name: { in: filters.brands } });
  }

  if (filters.pattyTypes?.length) {
    AND.push({ patty: { in: filters.pattyTypes } });
  }

  if (filters.calories) {
    if (filters.calories.min !== undefined) {
      AND.push({ Nutrition: { calories: { gte: filters.calories.min } } });
    }
    if (filters.calories.max !== undefined) {
      AND.push({ Nutrition: { calories: { lte: filters.calories.max } } });
    }
  }

  if (filters.price) {
    if (filters.price.min !== undefined) {
      AND.push({ price: { gte: filters.price.min } });
    }
    if (filters.price.max !== undefined) {
      AND.push({ price: { lte: filters.price.max } });
    }
  }

  if (AND.length > 0) {
    where.AND = AND;
  }

  return where;
}
