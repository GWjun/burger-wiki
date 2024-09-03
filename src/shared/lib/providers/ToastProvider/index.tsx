'use client';

import { ReactNode, useRef, useState } from 'react';
import Toast from '#shared/ui/Toast';
import {
  ToastType,
  ToastOptions,
  ToastContext,
} from '../ToastProvider/ToastContext';
import ToastContainer from '#shared/ui/ToastContainer';

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const latestIdRef = useRef(1);

  const addToast = ({
    message,
    variant = 'primary',
    duration = 3000,
  }: ToastOptions) => {
    const id = latestIdRef.current++;
    setToasts([...toasts, { id, message, variant }]);
    setTimeout(() => removeToast(id), duration);
  };

  const removeToast = (id: number) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            onClose={() => removeToast(toast.id)}
          >
            {toast.message}
          </Toast>
        ))}
      </ToastContainer>
      {children}
    </ToastContext.Provider>
  );
}
