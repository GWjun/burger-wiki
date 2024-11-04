import React, { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';

import { FormData } from '../../model/ReviewFormData';
import 'react-datepicker/dist/react-datepicker.css';
import * as styles from './styles.css';

export const DatePickerElement = memo(() => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <>
      <Controller
        control={control}
        name="consumed_at"
        render={({ field }) => (
          <DatePicker
            id="consumed_at"
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat="M월 d일"
            placeholderText="소비 날짜를 선택하세요"
            maxDate={new Date()}
            locale={ko}
            onFocus={(e) => e.target.blur()}
            className={styles.datePicker}
            calendarClassName={styles.calender}
          />
        )}
      />
      {errors.consumed_at && (
        <span className={styles.error}>{errors.consumed_at.message}</span>
      )}
    </>
  );
});

DatePickerElement.displayName = 'DatePickerElement';
