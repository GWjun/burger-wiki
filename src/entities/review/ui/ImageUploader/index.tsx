import { memo, useEffect } from 'react';
import Image from 'next/image';
import { Controller, useFormContext } from 'react-hook-form';
import { X } from 'lucide-react';

import { FormData, MAX_IMAGE } from '#entities/review/model/ReviewFormData';
import { useImageUpload } from '#entities/review/hooks/useImageUpload';
import * as styles from './styles.css';

export const ImageElement = memo(() => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FormData>();

  const { images, setImages, handleImageChange, handleRemoveImage } =
    useImageUpload(MAX_IMAGE);

  useEffect(() => {
    return () => setImages([]);
  }, []);

  return (
    <Controller
      control={control}
      name="images"
      render={({ field }) => (
        <>
          <div className={styles.imagePreviewGrid}>
            {images.map((image, index) => (
              <div key={index} className={styles.imageBox}>
                <Image
                  src={image.preview}
                  fill
                  sizes="100px"
                  alt={`미리보기 ${index}`}
                  className={styles.image}
                />
                <button
                  onClick={() => handleRemoveImage(index, field)}
                  className={styles.deleteButton}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            {images.length < MAX_IMAGE && (
              <>
                <label
                  htmlFor="image-upload-input"
                  className={styles.imageUploadBox}
                >
                  <span>
                    {images.length} / {MAX_IMAGE}
                  </span>
                </label>
                <input
                  id="image-upload-input"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, field)}
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
});

ImageElement.displayName = 'ImageElement';
