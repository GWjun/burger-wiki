import { trpc } from '#shared/lib/utils/trpc';

export function useReviewMutations() {
  const utils = trpc.useUtils();

  // updateReview mutation
  const { mutate: updateMutate, status: updateStatus } =
    trpc.review.updateReview.useMutation({
      onSuccess: () => {
        utils.review.getReviews.invalidate();
      },
    });

  // removeReview mutation
  const { mutate: removeMutate, status: removeStatus } =
    trpc.review.removeReview.useMutation({
      onSuccess: () => {
        utils.review.getReviews.invalidate();
      },
    });

  // addReviewLike mutation
  const { mutate: likeMutate, status: likeStatus } =
    trpc.review.addReviewLike.useMutation({
      onSuccess: () => {
        utils.review.getReviews.invalidate();
      },
    });

  return {
    update: {
      mutate: updateMutate,
      status: updateStatus,
    },
    remove: {
      mutate: removeMutate,
      status: removeStatus,
    },
    like: {
      mutate: likeMutate,
      status: likeStatus,
    },
  };
}
