'use client';

import type { Session } from 'next-auth';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Button from '#shared/ui/Button';
import LoadingSpinner from '#shared/ui/LoadingSpinner';
import Skeleton from '#shared/ui/Skeleton';
import { trpc } from '#shared/lib/utils/trpc';
import * as styles from './styles.css';

interface ProductLikesProps {
  product_id: number;
  session: Session | null;
}

export function ProductLikes({ product_id, session }: ProductLikesProps) {
  const { data: product, refetch } = trpc.product.getProductById.useQuery({
    product_id,
  });

  const { mutate, status } = trpc.product.addProductLike.useMutation();

  const router = useRouter();
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
    if (!session || !session.user?.id) {
      router.push(`/login?callbackUrl=burger/${product_id}`);
      return null;
    }

    setIsLike(true);
    const userId = session.user.id;
    mutate({ userId, product_id, is_like: true });
  }

  function handleDisLike() {
    if (!session || !session.user?.id) {
      router.push(`/login?callbackUrl=burger/${product_id}`);
      return null;
    }

    setIsLike(false);
    const userId = session.user.id;
    mutate({ userId, product_id, is_like: false });
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
