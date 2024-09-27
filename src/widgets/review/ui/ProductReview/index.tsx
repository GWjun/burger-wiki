'use client';

import { useState } from 'react';
import { useOverlay } from '@toss/use-overlay';

import {
  FilterMenu,
  type ReviewOrderType,
  ReviewForm,
  ReviewPost,
  useReview,
} from '#entities/review';
import { useAuthRedirect } from '#shared/hooks/useAuthRedirect';
import Button from '#shared/ui/Button';
import Modal from '#shared/ui/Modal';
import LoadingSpinner from '#shared/ui/LoadingSpinner';
import * as styles from './styles.css';

interface ProductReviewProps {
  product_id: number;
}

export function ProductReview({ product_id }: ProductReviewProps) {
  const { isRedirect, redirectToLogin } = useAuthRedirect();
  const overlay = useOverlay();

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
    return overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} onClose={close}>
        <ReviewForm product_id={product_id} onClose={close} />
      </Modal>
    ));
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <FilterMenu
          filter={order}
          setFilter={setOrder}
          withImage={withImage}
          setWithImage={setWithImage}
        />
        <Button variant="outline" onClick={openWriteModal}>
          작성하기
        </Button>
      </div>

      {status === 'pending' ? (
        <LoadingSpinner />
      ) : reviews.length ? (
        reviews.map((review) => <ReviewPost review={review} key={review.id} />)
      ) : (
        <div className={styles.nothing}>리뷰를 작성해 주세요</div>
      )}

      <div ref={ref} />
      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  );
}
