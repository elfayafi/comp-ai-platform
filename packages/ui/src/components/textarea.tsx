import * as React from 'react';

import { cn } from '../utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'border-input bg-background flex min-h-20 w-full rounded-lg border-2 px-3.5 py-2.5 text-sm transition-all duration-200',
          'placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary',
          'hover:border-input/80 focus-visible:shadow-sm focus-visible:outline-hidden',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-secondary/50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
