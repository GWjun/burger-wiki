import { useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { flatMap } from 'es-toolkit';

import type { ReviewOrderType } from '#entities/review';
import { trpc } from '#shared/lib/utils/trpc';
import { Review, User, ReviewImage } from '@prisma/client';

export function useReview({
  product_id,
  order = 'LATEST',
  withImage = false,
  limit,
}: {
  product_id: number;
  order?: ReviewOrderType;
  withImage?: boolean;
  limit?: number;
}) {
  const result = trpc.review.getReviews.useInfiniteQuery(
    {
      product_id,
      order,
      withImage,
      limit,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const { data, ...rest } = result;
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = rest;
  const reviews = flatMap(
    data?.pages || [],
    (page) => page.reviews,
  ) as (Review & { User: User; ReviewImage: ReviewImage[] })[];

  const { ref } = useInView({
    onChange: useCallback(
      (inView: boolean) => {
        if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
      },
      [fetchNextPage, hasNextPage, isFetchingNextPage],
    ),
  });

  return { reviews, ref, ...rest };
}
