import type { ComponentPropsWithRef } from 'react';
import { forwardRef } from 'react';
import Label from '#shared/ui/Label';
import { container, inputVariants } from './styles.css';
import clsx from 'clsx';

export interface InputProps
  extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  label?: string;
  variant?: 'default' | 'text';
  size?: 'sm' | 'md' | 'lg';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, variant = 'default', size = 'md', className, ...props }, ref) => {
    return (
      <div className={container}>
        {label && (
          <Label id={props.id} required={props.required}>
            {label}
          </Label>
        )}

        <input
          ref={ref}
          className={clsx(inputVariants({ variant, size }), className)}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
