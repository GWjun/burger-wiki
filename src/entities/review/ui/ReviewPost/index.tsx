import { Review, ReviewImage, User } from '@prisma/client';
import Image from 'next/image';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

import { getBasicDate } from '#shared/lib/utils/date';
import Avatar from '#shared/ui/Avatar';
import RatingStar from '#shared/ui/RatingStar';
import * as styles from './styles.css';
import { trpc } from '#shared/lib/utils/trpc';

interface ReviewPostProps {
  review: Review & { User: User; ReviewImage: ReviewImage[] };
}

export function ReviewPost({ review }: ReviewPostProps) {
  const utils = trpc.useUtils();
  const { mutate, status } = trpc.review.addReviewLike.useMutation({
    onSuccess: () => {
      utils.review.getReviews.invalidate();
    },
  });

  const {
    id,
    consumed_at,
    score,
    comment,
    likes_count,
    dislikes_count,
    User,
    ReviewImage,
  } = review;

  let isPlain = true;
  if (comment || ReviewImage.length) isPlain = false;

  function handleLike() {
    mutate({ review_id: Number(id), is_like: true });
  }

  function handleDisLike() {
    mutate({ review_id: Number(id), is_like: false });
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Avatar src={User.image} size={30} />
        <div>
          <div className={styles.userName}>{User.name}</div>
          <div className={styles.info}>
            <RatingStar size={18} initialValue={score} />
            <div className={styles.date}>{getBasicDate(consumed_at)}</div>
          </div>
        </div>
      </div>

      <div className={styles.comment}>{comment}</div>

      <div className={styles.imageGrid}>
        {ReviewImage.map((image, index) => (
          <div className={styles.imageBox} key={image.id}>
            <Image
              src={image.image_url}
              alt={`리뷰 이미지 ${index}`}
              fill
              sizes="233.59px"
              className={styles.image}
            />
          </div>
        ))}
      </div>

      {!isPlain && (
        <div className={styles.likesContainer}>
          <div className={styles.likes}>
            <button
              onClick={handleLike}
              className={styles.button}
              disabled={status === 'pending'}
              aria-label="좋아요"
            >
              <ThumbsUp size={14} />
            </button>
            {likes_count}
          </div>
          <div className={styles.likes}>
            <button
              onClick={handleDisLike}
              className={styles.button}
              disabled={status === 'pending'}
              aria-label="싫어요"
            >
              <ThumbsDown size={14} aria-label="싫어요" />
            </button>
            {dislikes_count}
          </div>
        </div>
      )}
    </div>
  );
}
