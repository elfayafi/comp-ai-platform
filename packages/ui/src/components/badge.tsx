import { type VariantProps, cva } from 'class-variance-authority';
import type * as React from 'react';
import { cn } from '../utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-1 relative',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary/10 text-primary ring-1 ring-primary/20 hover:bg-primary/20',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive/10 text-destructive ring-1 ring-destructive/20 hover:bg-destructive/20',
        outline: 'text-foreground border-border hover:bg-secondary/50',
        tag: 'font-mono text-muted-foreground bg-accent text-[10px] border-none rounded-md hover:bg-accent/70',
        marketing:
          "flex items-center px-3 font-mono gap-2 whitespace-nowrap border bg-primary/5 text-primary hover:bg-primary/10 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary rounded-md",
        warning:
          'border-transparent bg-warning/10 text-warning ring-1 ring-warning/20 hover:bg-warning/20',
        success:
          'border-transparent bg-success/10 text-success ring-1 ring-success/20 hover:bg-success/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
