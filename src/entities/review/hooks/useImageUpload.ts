import { ChangeEvent, useState, useEffect } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { uploadImage } from '#shared/lib/utils/image-upload';
import { FormData } from '../model/ReviewFormData';

interface ImageState {
  url: string;
  loading: boolean;
}

export function useImageUpload(maxImages: number, initialImages?: string[]) {
  const [imageStates, setImageStates] = useState<ImageState[]>(
    initialImages?.map((url) => ({ url, loading: false })) ?? [],
  );

  useEffect(() => {
    return () => {
      imageStates.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [imageStates]);

  async function handleImageChange(
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FormData, 'images'>,
  ) {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files);

      // 로딩 상태를 위한 임시 데이터 추가
      const newLoadingStates = selectedFiles.map(() => ({
        url: '',
        loading: true,
      }));
      setImageStates((prev) =>
        [...prev, ...newLoadingStates].slice(0, maxImages),
      );

      try {
        const uploadedUrls = await Promise.all(
          selectedFiles.map((file) => uploadImage(file, 'temp')),
        );

        const currentImages = imageStates.filter((img) => !img.loading);
        const newImages = uploadedUrls.map((url) => ({ url, loading: false }));
        const updatedStates = [...currentImages, ...newImages].slice(
          0,
          maxImages,
        );

        setImageStates(updatedStates);
        field.onChange(updatedStates.map((state) => state.url));
      } catch (error) {
        const updatedStates = imageStates.filter((img) => !img.loading);
        setImageStates(updatedStates);
        field.onChange(updatedStates.map((state) => state.url));
      }
    }
  }

  async function handleRemoveImage(
    index: number,
    field: ControllerRenderProps<FormData, 'images'>,
  ) {
    const newImages = imageStates.filter((_, i) => i !== index);

    setImageStates(newImages);

    field.onChange(newImages);
  }

  return {
    imageStates,
    setImageStates,
    handleImageChange,
    handleRemoveImage,
  };
}
