import { ChangeEvent, useState, useEffect } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { uploadImage } from '#shared/lib/utils/image-upload';
import { FormData } from '../model/ReviewFormData';

export function useImageUpload(maxImages: number, initialImages?: string[]) {
  const [imageUrls, setImageUrls] = useState<string[]>(initialImages ?? []);

  useEffect(() => {
    return () => {
      imageUrls.forEach((image) => URL.revokeObjectURL(image));
    };
  }, [imageUrls]);

  async function handleImageChange(
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FormData, 'images'>,
  ) {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files);

      const newImages = await Promise.all(
        selectedFiles.map(async (file) => {
          return uploadImage(file, 'temp');
        }),
      );

      const totalImages = [...imageUrls, ...newImages].slice(0, maxImages);

      setImageUrls(totalImages);

      const urlsForField = totalImages.map((image) => image);
      field.onChange(urlsForField);
    }
  }

  async function handleRemoveImage(
    index: number,
    field: ControllerRenderProps<FormData, 'images'>,
  ) {
    const newImages = imageUrls.filter((_, i) => i !== index);

    setImageUrls(newImages);

    field.onChange(newImages);
  }

  return {
    imageUrls,
    setImageUrls,
    handleImageChange,
    handleRemoveImage,
  };
}
