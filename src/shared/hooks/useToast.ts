import { useContext } from 'react';
import { AppError } from '@error/error';
import { ToastContext } from '#shared/lib/providers/ToastProvider/ToastContext';

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new AppError(
      'CONTEXT_NOT_FOUND',
      'useToast는 ToastProvider 내부에서만 사용할 수 있습니다.',
    );
  }
  return context;
}
