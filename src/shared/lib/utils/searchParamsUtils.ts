import type { ProductOrderType } from '#entities/product';

const ALLOWED_ORDER_VALUES: ReadonlyArray<ProductOrderType> = [
  'release',
  'name',
  'like',
  'rating',
];

const ALLOWED_SORT_ORDER_VALUES: ReadonlyArray<'asc' | 'desc'> = [
  'asc',
  'desc',
];

/**
 * 주어진 값이 유효한 ProductOrderType인지 확인하는 타입 가드 함수입니다.
 */
export function isValidOrderType(value: unknown): value is ProductOrderType {
  return (
    typeof value === 'string' &&
    (ALLOWED_ORDER_VALUES as readonly string[]).includes(value)
  );
}

/**
 * 주어진 값이 유효한 정렬 순서('asc' 또는 'desc')인지 확인하는 타입 가드 함수입니다.
 */
export function isValidSortOrder(value: unknown): value is 'asc' | 'desc' {
  return (
    typeof value === 'string' &&
    (ALLOWED_SORT_ORDER_VALUES as readonly string[]).includes(value)
  );
}

/**
 * Next.js의 searchParams 객체에서 특정 키의 값을 안전하게 추출합니다.
 */
export async function getSearchParam(
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>,
  key: string,
) {
  const params = await searchParams;

  if (!params) {
    return undefined;
  }

  const value = params[key];
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}
