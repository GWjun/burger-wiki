'use client';

import { Heart } from 'lucide-react';
import { useBrandLike } from '../../hooks/useBrandLike';
import * as styles from './styles.css';

export function LikeButton({ brand_id }: { brand_id: number }) {
  const { isLike, mutate, queryStatus, mutateStatus } = useBrandLike(brand_id);

  if (queryStatus === 'pending') return <div className={styles.skeleton} />;

  function handleLike() {
    mutate({ brand_id });
  }

  return (
    <button
      onClick={handleLike}
      disabled={mutateStatus === 'pending'}
      aria-label="좋아요"
      className={styles.button}
    >
      {isLike ? <Heart size={20} fill="red" /> : <Heart size={20} />}
    </button>
  );
}
