import type { ComponentPropsWithRef } from 'react';
import { X } from 'lucide-react';
import * as styles from './styles.css';

export interface CloseButtonProps extends ComponentPropsWithRef<'button'> {
  size?: number;
}

export default function CloseButton({ size = 15, onClick }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={styles.closeButton}
      aria-label="모달창 닫기 버튼"
    >
      <X size={size} aria-label="X" className={styles.icon} />
    </button>
  );
}
