import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '#shared/ui/Button';
import LoadingSpinner from '#shared/ui/LoadingSpinner';

import type { FormData, FormDataValues } from '../../model/ReviewFormData';
import { reviewFormSchema } from '../../model/ReviewFormSchema';

import { Rating } from 'react-simple-star-rating';
import { ImageElement } from '../ImageUploader';
import { DatePickerElement } from '../DatePicker';
import * as styles from './styles.css';

export interface ReviewFormProps {
  onSubmit: (data: FormData) => void;
  initialValues?: FormDataValues;
  submitName?: string;
  onClose?: any;
  isCloseButton?: boolean;
}

export function ReviewForm({
  onSubmit,
  initialValues,
  submitName = '리뷰 작성',
  onClose,
  isCloseButton = false,
}: ReviewFormProps) {
  const defaultValues = {
    comment: '',
    score: 0,
    consumed_at: new Date(),
    ...initialValues,
  };

  const methods = useForm<FormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = methods;

  function handleClose() {
    onClose?.();
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Rating
          onClick={(rate) => setValue('score', rate)}
          readonly={isSubmitting}
          size={40}
          initialValue={defaultValues.score}
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

        <ImageElement initialImages={initialValues?.images} />

        <div className={styles.buttonContainer}>
          {isCloseButton && (
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className={styles.button}
            >
              취소하기
            </Button>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className={styles.button}
          >
            {isSubmitting ? <LoadingSpinner /> : submitName}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
