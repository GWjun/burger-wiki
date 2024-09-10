import type { ComponentPropsWithRef } from 'react';
import clsx from 'clsx';
import * as styles from './styles.css';

interface SkeletonProps extends ComponentPropsWithRef<'div'> {}

export default function Skeleton({
  children,
  className,
  ...props
}: SkeletonProps) {
  return (
    <div className={clsx(styles.skeleton, className)} {...props}>
      {children}
    </div>
  );
}
