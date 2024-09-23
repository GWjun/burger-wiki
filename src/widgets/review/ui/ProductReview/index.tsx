'use client';

import { useRouter } from 'next/navigation';
import { useOverlay } from '@toss/use-overlay';

import { ReviewForm } from '#entities/Review';
import { useSession } from 'next-auth/react';
import Button from '#shared/ui/Button';
import Modal from '#shared/ui/Modal';
import * as styles from './styles.css';

interface ProductReviewProps {
  product_id: number;
}

export function ProductReview({ product_id }: ProductReviewProps) {
  const router = useRouter();
  const overlay = useOverlay();
  const session = useSession();

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
        {/*<div className={styles.filter}>*/}
        {/*  <Button>필터</Button>*/}
        {/*  <Button>필터</Button>*/}
        {/*</div>*/}
        {/*<Button variant="outline" onClick={openModal}>*/}
        {/*  작성하기*/}
        {/*</Button>*/}
      </div>
    </div>
  );
}
