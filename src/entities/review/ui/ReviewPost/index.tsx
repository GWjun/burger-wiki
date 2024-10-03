import { Review, ReviewImage, User } from '@prisma/client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useOverlay } from '@toss/use-overlay';
import { Ellipsis, ThumbsDown, ThumbsUp } from 'lucide-react';

import { getBasicDate } from '#shared/lib/utils/date';
import Avatar from '#shared/ui/Avatar';
import RatingStar from '#shared/ui/RatingStar';
import Menu from '#shared/ui/Menu';
import MenuItem from '#shared/ui/MenuItem';

import { useReviewMutations } from '../../hooks/useReviewMutations';
import { DeleteImageProvider } from '../../lib/DeleteImageProvider';
import { UpdateReview } from '../UpdateReview';
import * as styles from './styles.css';

interface ReviewPostProps {
  product_id: number;
  review: Review & { User: User; ReviewImage: ReviewImage[] };
}

export function ReviewPost({ product_id, review }: ReviewPostProps) {
  const session = useSession();
  const overlay = useOverlay();

  const { remove, like } = useReviewMutations();
  const [updateMode, setUpdateMode] = useState(false);

  if (updateMode) {
    return (
      <DeleteImageProvider>
        <UpdateReview
          product_id={product_id}
          review={review}
          onClose={setUpdateMode}
        />
      </DeleteImageProvider>
    );
  }

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

  function openMenu() {
    return overlay.open(({ isOpen, close }) => (
      <Menu
        renderId={`review-menu-${id}`}
        isOpen={isOpen}
        onClose={close}
        className={styles.menu}
      >
        <MenuItem
          onClick={() => {
            setUpdateMode(true);
          }}
          className={styles.updateItem}
        >
          수정하기
        </MenuItem>
        <MenuItem
          onClick={() => {
            remove.mutate({ review_id: Number(id) });
          }}
          className={styles.deleteItem}
        >
          삭제하기
        </MenuItem>
      </Menu>
    ));
  }

  function handleLike() {
    like.mutate({ review_id: Number(id), is_like: true });
  }

  function handleDisLike() {
    like.mutate({ review_id: Number(id), is_like: false });
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
        {User.email === session.data?.user?.email && (
          <button
            id={`review-menu-${id}`}
            onClick={openMenu}
            disabled={remove.status === 'pending'}
            className={styles.menuButton}
          >
            <Ellipsis size={14} aria-label="리뷰 메뉴" />
          </button>
        )}
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
              disabled={like.status === 'pending'}
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
              disabled={like.status === 'pending'}
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
