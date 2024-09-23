import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { FormData } from '../model/ReviewFormData';

export interface ImagePreview {
  file: File;
  preview: string;
}

export function useImageUpload(maxImages: number) {
  const [images, setImages] = useState<ImagePreview[]>([]);

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  function handleImageChange(
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FormData, 'images'>,
  ) {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files);

      const newImages = selectedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      const totalImages = [...images, ...newImages].slice(0, maxImages);

      setImages(totalImages);

      const filesForField = totalImages.map((image) => image.file);
      field.onChange(filesForField);
    }
  }

  function handleRemoveImage(
    index: number,
    field: ControllerRenderProps<FormData, 'images'>,
  ) {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);

      const filesForField = newImages.map((image) => image.file);
      field.onChange(filesForField);

      return newImages;
    });
  }

  return {
    images,
    setImages,
    handleImageChange,
    handleRemoveImage,
  };
}
