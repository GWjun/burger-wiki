'use client';

import { useState } from 'react';
import { useOverlay } from '@toss/use-overlay';

import {
  type FormData,
  type ReviewOrderType,
  ReviewOrderOptions,
  ReviewForm,
  ReviewPost,
  useReview,
} from '#entities/review';

import { trpc } from '#shared/lib/utils/trpc';
import { moveImage } from '#shared/lib/utils/image-upload';
import { useToast } from '#shared/hooks/useToast';
import { useAuthRedirect } from '#shared/hooks/useAuthRedirect';

import Button from '#shared/ui/Button';
import Modal from '#shared/ui/Modal';
import LoadingSpinner from '#shared/ui/LoadingSpinner';
import * as styles from './styles.css';
import Label from '#shared/ui/Label';
import { FilterMenuButton } from '#features/filter';

interface ProductReviewProps {
  product_id: number;
}

export function ProductReview({ product_id }: ProductReviewProps) {
  const { isRedirect, redirectToLogin } = useAuthRedirect();
  const overlay = useOverlay();
  const { addToast } = useToast();
  const utils = trpc.useUtils();

  const [order, setOrder] = useState<ReviewOrderType>('LATEST');
  const [withImage, setWithImage] = useState(false);

  const { reviews, status, ref, isFetchingNextPage } = useReview({
    product_id,
    order,
    withImage,
    limit: 10,
  });

  function openWriteModal() {
    if (isRedirect) {
      redirectToLogin();
      return;
    }

    return overlay.open(({ isOpen, close }) => {
      const { mutateAsync } = trpc.review.addReview.useMutation({
        onSuccess: () => {
          utils.review.getReviews.invalidate({ product_id });
          close();
        },
      });

      const onSubmit = async (data: FormData) => {
        const { score, comment, consumed_at, images } = data;
        let image_url: string[] = [];

        try {
          if (images && images.length > 0) {
            image_url = await Promise.all(
              images.map((tempUrl) =>
                moveImage(tempUrl, `review/${product_id}`),
              ),
            );
          }

          await mutateAsync({
            product_id,
            score,
            comment,
            consumed_at,
            image_url,
          });

          addToast({
            message: '리뷰가 성공적으로 제출되었습니다.',
            variant: 'success',
          });
        } catch (error) {
          addToast({
            message: '리뷰를 제출하는데 실패했습니다.',
            variant: 'error',
          });
        }
      };

      return (
        <Modal isOpen={isOpen} onClose={close}>
          <ReviewForm onValid={onSubmit} />
        </Modal>
      );
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.filter}>
          <FilterMenuButton
            filter={order}
            setFilter={setOrder}
            options={ReviewOrderOptions}
          />
          <input
            id="withImage"
            type="checkbox"
            checked={withImage}
            onChange={(e) => setWithImage(e.target.checked)}
          />
          <Label id="withImage" className={styles.label}>
            포토리뷰
          </Label>
        </div>

        <Button variant="outline" onClick={openWriteModal}>
          작성하기
        </Button>
      </div>

      {status === 'pending' ? (
        <LoadingSpinner />
      ) : reviews.length ? (
        reviews.map((review) => (
          <ReviewPost product_id={product_id} review={review} key={review.id} />
        ))
      ) : (
        <div className={styles.nothing}>리뷰를 작성해 주세요</div>
      )}

      <div ref={ref} />
      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
}
