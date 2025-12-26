import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '../utils';

const buttonVariants = cva(
  'inline-flex items-center gap-2 justify-center text-sm rounded-lg font-medium transition-all duration-200 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white shadow-sm hover:bg-primary-hover hover:shadow-md active:shadow-sm',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md',
        outline:
          'border-2 border-input bg-background shadow-xs hover:bg-secondary hover:border-primary/20 hover:shadow-sm',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 hover:shadow-sm',
        ghost: 'hover:bg-secondary hover:text-foreground transition-colors duration-200',
        link: 'text-primary underline-offset-4 hover:underline hover:text-primary-hover',
      },
      size: {
        default: 'h-10 px-5 py-2.5 text-sm',
        sm: 'h-8 rounded-md px-3.5 text-xs',
        lg: 'h-12 rounded-lg px-8 text-base',
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
