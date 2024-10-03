import { useContext } from 'react';
import { DeleteImageContext } from '../lib/DeleteImageProvider';
import { AppError } from '#error/error';

export function useDeleteImage() {
  const context = useContext(DeleteImageContext);

  if (!context) {
    throw new AppError(
      'CONTEXT_NOT_FOUND',
      'useDeleteImage는 provider 내부에서 작성되어야 합니다.',
    );
  }

  return context;
}
