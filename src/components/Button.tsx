import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center select-none rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary-color hover:bg-opacity-80 text-white',
        destructive: 'bg-red-600 text-white hover:bg-opacity-80',
        outline:
          'border border-primary-color bg-transparent hover:bg-primary-color/10',
        secondary: 'bg-secondary-color text-white hover:bg-opacity-80',
        ghost: 'hover:bg-primary-color/10',
        link: 'text-primary-color underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants, type ButtonProps };
