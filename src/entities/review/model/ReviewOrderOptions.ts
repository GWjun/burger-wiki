export const ReviewOrderOptions = {
  LATEST: '최신순',
  HIGHEST_RATING: '평점 높은 순',
  LOWEST_RATING: '평점 낮은 순',
  MOST_LIKES: '도움 되는 순',
};

export type ReviewOrderType = keyof typeof ReviewOrderOptions;
