export const BrandProductOrderOptions = {
  RELEASE: '출시순',
  NAME: '이름순',
  HIGHEST_RATING: '평점순',
  MOST_LIKES: '인기순',
};

export type BrandProductOrderType = keyof typeof BrandProductOrderOptions;
