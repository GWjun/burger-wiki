import { Review, ReviewImage, User } from '@prisma/client';

import { Dispatch, SetStateAction } from 'react';

import { type FormData, ReviewForm } from '#entities/review';
import { trpc } from '#shared/lib/utils/trpc';
import { deleteImage, moveImage } from '#shared/lib/utils/image-upload';
import { useToast } from '#shared/hooks/useToast';
import Avatar from '#shared/ui/Avatar';
import * as styles from './styles.css';

interface UpdateFormProps {
  product_id: number;
  review: Review & { User: User; ReviewImage: ReviewImage[] };
  onClose?: Dispatch<SetStateAction<boolean>>;
}

export function UpdateForm({ product_id, review, onClose }: UpdateFormProps) {
  const { addToast } = useToast();
  const utils = trpc.useUtils();

  const { id, consumed_at, score, comment, User, ReviewImage } = review;
  const images = ReviewImage.map((image) => image.image_url);

  const { mutateAsync } = trpc.review.updateReview.useMutation({
    onSuccess: () => {
      utils.review.getReviews.invalidate({ product_id });
      onClose?.(false);
    },
  });

  const onSubmit = async (data: FormData) => {
    const { score, comment, consumed_at, images: newImages } = data;
    let image_url: string[] = [];

    try {
      if (newImages && newImages.length > 0) {
        image_url = await Promise.all(
          newImages.map((tempUrl) =>
            moveImage(tempUrl, `review/${product_id}`),
          ),
        );
      }

      const imagesToDelete = images.filter(
        (image) => !newImages.includes(image),
      );

      imagesToDelete.map((url) => deleteImage(url));

      await mutateAsync({
        review_id: Number(id),
        score,
        comment,
        consumed_at,
        image_url,
      });

      addToast({
        message: '리뷰가 성공적으로 수정되었습니다.',
        variant: 'success',
      });
    } catch (error) {
      addToast({
        message: '리뷰를 제출하는데 실패했습니다.',
        variant: 'error',
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Avatar src={User.image} size={30} />
        <div>
          <div className={styles.userName}>{User.name}</div>
        </div>
      </div>

      <ReviewForm
        onSubmit={onSubmit}
        initialValues={{
          score,
          comment: comment ?? '',
          consumed_at,
          images,
        }}
        submitName="수정하기"
        onClose={onClose}
        isCloseButton
        className={styles.form}
      />
    </div>
  );
}
