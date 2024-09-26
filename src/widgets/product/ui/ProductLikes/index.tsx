'use client';

import { useEffect, useState } from 'react';

import Button from '#shared/ui/Button';
import LoadingSpinner from '#shared/ui/LoadingSpinner';
import Skeleton from '#shared/ui/Skeleton';
import { trpc } from '#shared/lib/utils/trpc';
import * as styles from './styles.css';

interface ProductLikesProps {
  product_id: number;
}

export function ProductLikes({ product_id }: ProductLikesProps) {
  const { data: product, refetch } = trpc.product.getProductById.useQuery({
    product_id,
  });

  const { mutate, status } = trpc.product.addProductLike.useMutation();
  const [isLike, setIsLike] = useState<boolean | null>(null);

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      refetch();
      setIsLike(null);
    }
  }, [status, refetch, setIsLike]);

  if (!product) {
    return (
      <div className={styles.likesContainer}>
        <Skeleton className={styles.buttonSkeleton} />
        <Skeleton className={styles.buttonSkeleton} />
      </div>
    );
  }

  const { likes_count, dislikes_count } = product;

  function handleLike() {
    setIsLike(true);
    mutate({ product_id, is_like: true });
  }

  function handleDisLike() {
    setIsLike(false);
    mutate({ product_id, is_like: false });
  }

  return (
    <div className={styles.likesContainer}>
      <Button onClick={handleDisLike} className={styles.dislikesButton}>
        <span className={styles.likesTitle}>비추천</span>
        <div className={styles.dividedLine} aria-label="구분선" />
        <span className={styles.likesContent}>
          {status === 'pending' && !isLike ? (
            <LoadingSpinner />
          ) : (
            `${dislikes_count}개`
          )}
        </span>
      </Button>
      <Button onClick={handleLike} className={styles.likesButton}>
        <span className={styles.likesTitle}>추천</span>
        <div className={styles.dividedLine} aria-label="구분선" />
        <span className={styles.likesContent}>
          {status === 'pending' && isLike ? (
            <LoadingSpinner />
          ) : (
            `${likes_count}개`
          )}
        </span>
      </Button>
    </div>
  );
}
