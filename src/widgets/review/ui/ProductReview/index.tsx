'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useOverlay } from '@toss/use-overlay';

import { ReviewForm, ReviewPost, useReview } from '#entities/review';
import Button from '#shared/ui/Button';
import Modal from '#shared/ui/Modal';
import LoadingSpinner from '#shared/ui/LoadingSpinner';
import * as styles from './styles.css';

interface ProductReviewProps {
  product_id: number;
}

export function ProductReview({ product_id }: ProductReviewProps) {
  const router = useRouter();
  const session = useSession();
  const overlay = useOverlay();
  const { reviews, status, ref, isFetchingNextPage } = useReview({
    product_id,
    limit: 10,
  });

  function openModal() {
    if (session.status === 'unauthenticated') {
      router.push(`/login?callbackUrl=burger/${product_id}`);
      return null;
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
          <Button>필터</Button>
          <Button>필터</Button>
        </div>
        <Button variant="outline" onClick={openModal}>
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
