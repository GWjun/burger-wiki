import { useContext } from 'react';
import { ToastContext } from '#shared/lib/providers/ToastProvider/ToastContext';
import { AppError } from '@error/AppError';

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
