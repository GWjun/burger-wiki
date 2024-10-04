import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import * as styles from './styles.css';

export interface LabelProps extends ComponentPropsWithoutRef<'label'> {
  required?: boolean;
}

const Label = ({
  id,
  required = false,
  children,
  className,
  ...props
}: LabelProps) => {
  return (
    <label htmlFor={id} {...props} className={clsx(styles.label, className)}>
      {children}
      {required && (
        <span className={styles.required} aria-hidden>
          *
        </span>
      )}
    </label>
  );
};

export default Label;
