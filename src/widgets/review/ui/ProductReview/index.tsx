'use client';

import { useState } from 'react';
import { useOverlay } from '@toss/use-overlay';

import { ReviewForm, ReviewPost, useReview } from '#entities/review';
import { useAuthRedirect } from '#shared/hooks/useAuthRedirect';
import Button from '#shared/ui/Button';
import Modal from '#shared/ui/Modal';
import Menu from '#shared/ui/Menu';
import LoadingSpinner from '#shared/ui/LoadingSpinner';
import MenuItem from '#shared/ui/MenuItem';
import * as styles from './styles.css';

interface ProductReviewProps {
  product_id: number;
}

const ReviewQueries = {
  recent: '최신 순',
  useful: '유용한 순',
};

type ReviewQueriesType = keyof typeof ReviewQueries;

export function ProductReview({ product_id }: ProductReviewProps) {
  const { isRedirect, redirectToLogin } = useAuthRedirect();
  const overlay = useOverlay();
  const { reviews, status, ref, isFetchingNextPage } = useReview({
    product_id,
    limit: 10,
  });

  const [query, setQuery] = useState<ReviewQueriesType>('recent');

  function openFilterModal() {
    return overlay.open(({ isOpen, close }) => (
      <Menu renderId="review-filter" isOpen={isOpen} onClose={close}>
        <MenuItem onClick={() => {}}>temp</MenuItem>
        <MenuItem onClick={() => {}}>temp</MenuItem>
      </Menu>
    ));
  }

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
        <div className={styles.filter}>
          <Button
            id="review-filter"
            onClick={openFilterModal}
            variant="text"
            className={styles.dropdown}
          >
            {ReviewQueries[query]}
          </Button>
          <label>사진만</label>
          <input type="checkbox" />
        </div>
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
