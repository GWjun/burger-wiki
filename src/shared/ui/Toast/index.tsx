import type { ComponentPropsWithoutRef } from 'react';
import { ToastVariant } from '#shared/lib/providers/ToastProvider/ToastContext';
import clsx from 'clsx';
import CloseButton from '#shared/ui/CloseButton';
import { getToastName } from '#shared/ui/Toast/utils';
import * as styles from './styles.css';

export interface ToastProps extends ComponentPropsWithoutRef<'div'> {
  variant?: ToastVariant;
  onClose: () => void;
}

const Toast = ({
  variant = 'primary',
  onClose,
  children,
  className,
  ...props
}: ToastProps) => {
  return (
    <div
      className={clsx(styles.toast, className)}
      role="alert"
      aria-live="assertive"
      {...props}
    >
      <div className={styles.toastLineVariants({ variant })} />
      <span className={styles.title}>{getToastName(variant)}</span>
      <p className={styles.content}>{children}</p>
      <CloseButton onClick={onClose} />
    </div>
  );
};

export default Toast;
