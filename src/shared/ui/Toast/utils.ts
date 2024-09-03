import { ToastVariant } from '#shared/lib/providers/ToastProvider/ToastContext';

const TOAST_NAME: Record<ToastVariant, string> = {
  primary: '정보',
  success: '성공',
  error: '오류',
  alert: '경고',
};

export const getToastName = (variant: ToastVariant): string => {
  return TOAST_NAME[variant];
};
