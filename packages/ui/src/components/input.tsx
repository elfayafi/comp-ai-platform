import * as React from 'react';

import { cn } from '../utils';

interface InputProps extends React.ComponentProps<'input'> {
  leftIcon?: React.ReactNode;
  prefix?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, prefix, ...props }, ref) => {
    const isUrl = type === 'url';
    const isPrefix = !!prefix;

    const adornmentWidth = 82; // px, matches pl-[82px]

    return (
      <div className={cn('relative w-full', className)}>
        {isPrefix && prefix && (
          <span
            className="text-muted-foreground border-input bg-foreground/5 absolute top-0 left-0 flex h-full cursor-default items-center border-r px-4 text-sm font-medium select-none"
            style={{
              width: adornmentWidth,
              zIndex: 2,
              borderTopLeftRadius: '0.5rem',
              borderBottomLeftRadius: '0.5rem',
            }}
          >
            {prefix}
          </span>
        )}
        {leftIcon && !isUrl && !isPrefix && (
          <span className="text-primary pointer-events-none absolute top-0 left-0 flex h-full items-center justify-center pl-3 text-sm">
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          // Add these attributes to help prevent interference from browser extensions
          autoComplete="off"
          data-lpignore="true"
          className={cn(
            'border-input bg-background flex h-10 w-full rounded-lg border-2 px-3.5 py-2 text-sm transition-all duration-200',
            'placeholder:text-muted-foreground/60 file:text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary focus-visible:outline-hidden',
            'hover:border-input/80 focus-visible:shadow-sm',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-secondary/50',
            isPrefix ? 'pl-[90px]' : leftIcon ? 'pl-[36px]' : '',
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
