import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '#shared/hooks/useToast';
import { trpc } from '#shared/lib/utils/trpc';
import { uploadImage } from '#shared/lib/utils/image-upload';
import Button from '#shared/ui/Button';
import LoadingSpinner from '#shared/ui/LoadingSpinner';

import { FormData } from '../../model/ReviewFormData';
import { reviewFormSchema } from '../../model/ReviewFormSchema';

import { ImageElement } from '../ImageUploader';
import { DatePickerElement } from '../DatePicker';
import * as styles from './styles.css';
import { Rating } from 'react-simple-star-rating';

export interface ReviewFormProps {
  product_id: number;
  onClose: () => void;
}

export function ReviewForm({ product_id, onClose }: ReviewFormProps) {
  const { addToast } = useToast();
  const utils = trpc.useUtils();

  const methods = useForm<FormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      comment: '',
      score: 0,
      consumed_at: new Date(),
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = methods;

  const { mutateAsync, status } = trpc.review.addReview.useMutation({
    onSuccess: () => {
      utils.review.getReviews.invalidate({ product_id });
    },
  });

  useEffect(() => {
    if (status === 'success') {
      onClose();
      reset();
    }
  }, [onClose, status, reset]);

  const onSubmit = async (data: FormData) => {
    const { score, comment, consumed_at, images } = data;
    let image_url;

    try {
      if (images) {
        const imagesArray = Array.from(images);
        const uploadPromises = imagesArray.map((file) =>
          uploadImage(file, `review/${product_id}`),
        );
        const urls = await Promise.all(uploadPromises);
        image_url = urls.filter((url): url is string => url !== null);
      }

      await mutateAsync({
        product_id,
        score,
        comment,
        consumed_at,
        image_url,
      });
    } catch (error) {
      addToast({
        message: '이미지를 전송하는데 실패했습니다.',
        variant: 'error',
      });

      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Rating
          onClick={(rate) => setValue('score', rate)}
          readonly={isSubmitting}
          size={40}
          allowFraction
          transition
          className={styles.stars}
        />
        {errors.score && (
          <span className={styles.error}>{errors.score.message}</span>
        )}

        <DatePickerElement />

        <textarea
          {...methods.register('comment', {
            required: '리뷰를 작성해주세요',
          })}
          placeholder="리뷰를 작성해주세요"
          className={styles.textarea}
        />
        {errors.comment && (
          <span className={styles.error}>{errors.comment.message}</span>
        )}

        <ImageElement />

        <Button type="submit" disabled={isSubmitting} className={styles.button}>
          {isSubmitting ? <LoadingSpinner /> : '리뷰 작성'}
        </Button>
      </form>
    </FormProvider>
  );
}
