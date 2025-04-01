import { Product, Brand } from '@prisma/client';

export interface PaginatedResult<T> {
  data: T[];
  nextCursor: number | undefined;
}

export type ProductPagination = PaginatedResult<Product>;

export type BrandPagination = PaginatedResult<Brand>;
