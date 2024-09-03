import { createContext } from 'react';

export type ToastVariant = 'primary' | 'success' | 'error' | 'alert';

export interface ToastType {
  id: number;
  message: string;
  variant: ToastVariant;
}

export interface ToastOptions {
  message: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastType[];
  addToast: ({ message, variant, duration }: ToastOptions) => void;
  removeToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);
