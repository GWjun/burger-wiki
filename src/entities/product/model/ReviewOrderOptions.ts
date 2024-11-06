export const ProductOrderOptions = {
  release: '출시순',
  name: '이름순',
  rating: '평점순',
  like: '인기순',
};

export type ProductOrderType = keyof typeof ProductOrderOptions;
