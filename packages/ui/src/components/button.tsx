import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../utils';

const buttonVariants = cva(
  'inline-flex items-center gap-2 justify-center text-sm rounded font-medium transition-colors focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap focus-visible:ring-1 focus-visible:ring-ring',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:bg-primary-hover',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-secondary hover:border-primary/20',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-secondary hover:text-foreground',
        link: 'text-primary underline-offset-4 hover:underline hover:text-primary-hover',
      },
      size: {
        default: 'h-10 px-5 py-2.5 text-sm',
        sm: 'h-8 rounded-sm px-3.5 text-xs',
        lg: 'h-12 rounded px-8 text-base',
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
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants, type ButtonProps };
