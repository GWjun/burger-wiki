import { Review, ReviewImage, User } from '@prisma/client';
import Image from 'next/image';
import { getBasicDate } from '#shared/lib/utils/date';
import Avatar from '#shared/ui/Avatar';
import RatingStar from '#shared/ui/RatingStar';
import * as styles from './styles.css';

interface ReviewPostProps {
  review: Review & { User: User; ReviewImage: ReviewImage[] };
}

export function ReviewPost({ review }: ReviewPostProps) {
  const { consumed_at, score, comment, User, ReviewImage } = review;

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
    </div>
  );
}
