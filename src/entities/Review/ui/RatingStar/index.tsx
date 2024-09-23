import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';

import { FormData } from '../../model/ReviewFormData';
import * as styles from './styles.css';

export const RatingStarElement = memo(() => {
  const {
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext<FormData>();

  const score = watch('score');

  return (
    <>
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
    </>
  );
});

RatingStarElement.displayName = 'RatingStarElement';
