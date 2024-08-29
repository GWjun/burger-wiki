import type { ComponentPropsWithRef } from 'react';
import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { buttonVariants } from '#shared/ui/Button/styles.css';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'destructive';
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'sm',
      asChild = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        ref={ref}
        className={`${buttonVariants({ variant, size })} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Button.displayName = 'Button';

export default Button;
