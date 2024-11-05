import { ProductOrderType } from '#entities/product';

export default function getOrderClause(
  order: ProductOrderType,
  sortOrder: 'asc' | 'desc',
) {
  let orderField: string;
  let orderValue: any = sortOrder;

  switch (order) {
    case 'RELEASE':
      orderField = 'released_at';
      orderValue = {
        sort: sortOrder,
        nulls: 'last',
      };
      break;
    case 'NAME':
      orderField = 'name';
      orderValue = sortOrder === 'asc' ? 'desc' : 'asc';
      break;
    case 'HIGHEST_RATING':
      orderField = 'score_avg';
      break;
    case 'MOST_LIKES':
      if (sortOrder === 'desc') orderField = 'likes_count';
      else {
        orderField = 'dislikes_count';
        orderValue = 'desc';
      }
      break;
    default:
      orderField = 'released_at';
  }

  return { orderField, orderValue };
}
