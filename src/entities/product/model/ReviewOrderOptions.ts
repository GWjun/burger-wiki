export const ProductOrderOptions = {
  RELEASE: '출시순',
  NAME: '이름순',
  HIGHEST_RATING: '평점순',
  MOST_LIKES: '인기순',
};

export type ProductOrderType = keyof typeof ProductOrderOptions;
