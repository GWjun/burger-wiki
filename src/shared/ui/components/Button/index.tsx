import type { ComponentPropsWithRef } from 'react';
import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { buttonVariants } from '#shared/ui/components/Button/styles.css';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'destructive';
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { size = 'sm', variant = 'primary', asChild = false, children, ...props },
    ref,
  ) => {
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        ref={ref}
        className={buttonVariants({ variant, size })}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Button.displayName = 'Button';

export default Button;
