import { useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { flatMap } from 'es-toolkit';
import { trpc } from '#shared/lib/utils/trpc';
import { Review, User, ReviewImage } from '@prisma/client';

export function useReview({
  product_id,
  limit,
}: {
  product_id: number;
  limit?: number;
}) {
  const result = trpc.review.getReviews.useInfiniteQuery(
    {
      product_id,
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
        console.log(inView, hasNextPage, !isFetchingNextPage);
        if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
      },
      [fetchNextPage, hasNextPage, isFetchingNextPage],
    ),
  });

  return { reviews, ref, ...rest };
}
