import { memo, useId } from 'react';
import Image from 'next/image';
import { Controller, useFormContext } from 'react-hook-form';
import { X } from 'lucide-react';

import { FormData, MAX_IMAGE } from '#entities/review/model/ReviewFormData';
import { useImageUpload } from '#entities/review/hooks/useImageUpload';
import LoadingSpinner from '#shared/ui/LoadingSpinner';

import clsx from 'clsx';
import * as styles from './styles.css';

export const ImageElement = memo(
  ({ initialImages }: { initialImages?: string[] }) => {
    const uniqueId = useId();

    const {
      control,
      formState: { errors },
    } = useFormContext<FormData>();

    const { imageStates, isLoading, handleImageChange, handleRemoveImage } =
      useImageUpload(MAX_IMAGE, initialImages);

    return (
      <Controller
        control={control}
        name="images"
        render={({ field }) => (
          <>
            <div className={styles.imagePreviewGrid}>
              {imageStates.map((image, index) => (
                <div key={index} className={styles.baseBox}>
                  {image.loading ? (
                    <LoadingSpinner variant="inset" />
                  ) : (
                    <>
                      <Image
                        src={image.url}
                        fill
                        sizes="100px"
                        alt={`미리보기 ${index}`}
                        className={styles.image}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index, field)}
                        className={styles.deleteButton}
                        aria-label="이미지 삭제 버튼"
                      >
                        <X size={12} />
                      </button>
                    </>
                  )}
                </div>
              ))}
              {imageStates.length < MAX_IMAGE && (
                <>
                  <label
                    htmlFor={`image-upload-input-${uniqueId}`}
                    className={clsx(
                      styles.imageUploadBox,
                      isLoading && styles.disabled,
                    )}
                  >
                    <span>
                      {imageStates.length} / {MAX_IMAGE}
                    </span>
                  </label>
                  <input
                    id={`image-upload-input-${uniqueId}`}
                    data-testid="file"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, field)}
                    disabled={isLoading}
                    style={{ display: 'none' }}
                  />
                </>
              )}
            </div>
            {errors.images && (
              <span className={styles.error}>{errors.images.message}</span>
            )}
          </>
        )}
      />
    );
  },
);

ImageElement.displayName = 'ImageElement';
