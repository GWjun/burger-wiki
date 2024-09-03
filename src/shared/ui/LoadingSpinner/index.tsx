import { Loader2 } from 'lucide-react';
import * as styles from './styles.css';
import clsx from 'clsx';

interface SpinnerProps {
  variant?: 'inset';
  className?: string;
}

export default function LoadingSpinner({ className, variant }: SpinnerProps) {
  return (
    <div
      className={clsx(
        styles.spinnerContainer,
        variant === 'inset' && styles.insetVariant,
        className,
      )}
    >
      <Loader2
        className={clsx(styles.spinnerIcon, className)}
        aria-label="로딩 중"
      />
    </div>
  );
}
