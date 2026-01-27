import { type ComponentProps } from 'react';
import { cn } from '@compiel/ui/cn';

type LogoVariant = 'primary' | 'dark' | 'light' | 'gradient' | 'monochrome';

interface LogoProps extends Omit<ComponentProps<'svg'>, 'variant'> {
  variant?: LogoVariant;
  showText?: boolean;
}

export function Logo({ variant = 'primary', showText = true, className, ...props }: LogoProps) {
  const getColors = () => {
    switch (variant) {
      case 'primary':
        return {
          icon: '#2563EB', // Professional Blue
          text: '#2563EB',
        };
      case 'dark':
        return {
          icon: '#1E40AF', // Darker Blue
          text: '#1E3A8A',
        };
      case 'light':
        return {
          icon: '#60A5FA', // Lighter Blue
          text: '#3B82F6',
        };
      case 'gradient':
        return {
          icon: 'url(#logo-gradient)',
          text: 'url(#text-gradient)',
        };
      case 'monochrome':
        return {
          icon: 'currentColor',
          text: 'currentColor',
        };
    }
  };

  const colors = getColors();

  return (
    <svg
      viewBox={showText ? '0 0 1200 800' : '0 0 800 800'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-8 w-auto', className)}
      {...props}
    >
      {variant === 'gradient' && (
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      )}

      {/* Icon Group */}
      <g transform="translate(100, 100)">
        {/* Document/Checklist */}
        <rect x="0" y="50" width="350" height="450" rx="15" fill={colors.icon} opacity="0.9" />
        <rect x="30" y="100" width="290" height="350" rx="10" fill="white" opacity="0.2" />

        {/* Checkboxes */}
        <g fill="white">
          <rect x="60" y="140" width="60" height="60" rx="8" />
          <rect x="60" y="240" width="60" height="60" rx="8" />
          <rect x="60" y="340" width="60" height="60" rx="8" />
        </g>

        {/* Checkmarks */}
        <g stroke={colors.icon} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <polyline points="75,170 85,185 105,160" />
          <polyline points="75,270 85,285 105,260" />
          <polyline points="75,370 85,385 105,360" />
        </g>

        {/* Text lines */}
        <g fill="white" opacity="0.8">
          <rect x="140" y="155" width="150" height="15" rx="5" />
          <rect x="140" y="180" width="120" height="12" rx="4" />
          <rect x="140" y="255" width="150" height="15" rx="5" />
          <rect x="140" y="280" width="110" height="12" rx="4" />
          <rect x="140" y="355" width="150" height="15" rx="5" />
          <rect x="140" y="380" width="130" height="12" rx="4" />
        </g>

        {/* Shield */}
        <g transform="translate(250, 150)">
          <path
            d="M 100 0 L 180 30 L 180 130 Q 180 200 100 250 Q 20 200 20 130 L 20 30 Z"
            fill={colors.icon}
            stroke="white"
            strokeWidth="8"
          />
          <path
            d="M 100 30 L 150 50 L 150 120 Q 150 165 100 195 Q 50 165 50 120 L 50 50 Z"
            fill="white"
            opacity="0.3"
          />
          {/* Check inside shield */}
          <polyline
            points="70,110 90,135 130,85"
            stroke="white"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>

      {/* Text "compiel" */}
      {showText && (
        <g transform="translate(650, 400)" fill={colors.text}>
          <text
            x="0"
            y="0"
            fontSize="180"
            fontWeight="700"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-0.02em"
          >
            compiel
          </text>
        </g>
      )}
    </svg>
  );
}

// Icon-only variant
export function LogoIcon({ variant = 'primary', className, ...props }: Omit<LogoProps, 'showText'>) {
  return <Logo variant={variant} showText={false} className={className} {...props} />;
}

// Separate text component for custom layouts
export function LogoText({ variant = 'primary', className, ...props }: ComponentProps<'span'>) {
  const getColor = () => {
    switch (variant) {
      case 'primary':
        return 'text-primary';
      case 'dark':
        return 'text-blue-900';
      case 'light':
        return 'text-blue-400';
      case 'gradient':
        return 'bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent';
      case 'monochrome':
        return 'text-current';
    }
  };

  return (
    <span
      className={cn('text-xl font-bold tracking-tight', getColor(), className)}
      {...props}
    >
      compiel
    </span>
  );
}
