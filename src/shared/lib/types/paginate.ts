export interface PaginatedResult<T> {
  data: T[];
  nextCursor: number | undefined;
}
