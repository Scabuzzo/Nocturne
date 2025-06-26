// src/_components/ui/Card.tsx

import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/_lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'default' | 'lg';
  hover?: boolean;
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const cardVariants = {
  default: 'bg-gray-900/50 border border-gray-800/50',
  elevated: 'bg-gray-900/80 border border-gray-800/30 shadow-lg shadow-black/20',
  outlined: 'bg-transparent border border-gray-700/50',
  glass: 'bg-gray-900/30 backdrop-blur-sm border border-gray-800/30',
};

const cardPadding = {
  none: 'p-0',
  sm: 'p-3',
  default: 'p-4',
  lg: 'p-6',
};

export function Card({
  children,
  className,
  variant = 'default',
  padding = 'default',
  hover = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg transition-all duration-200',
        cardVariants[variant],
        cardPadding[padding],
        hover && 'hover:border-gray-700/50 hover:shadow-md hover:shadow-black/10 hover:bg-gray-900/60',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div className={cn('pb-3', className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div className={cn('pt-3', className)} {...props}>
      {children}
    </div>
  );
}

// Utility function for class merging (if not already available)
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}