// src/_components/ui/Button.tsx

import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/_lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'default' | 'lg';
  children: ReactNode;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const buttonVariants = {
  primary: 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-sm hover:shadow-md border-0',
  secondary: 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 text-gray-300 hover:text-white',
  outline: 'border border-gray-700/50 hover:border-gray-600/50 text-gray-300 hover:text-white hover:bg-gray-800/30',
  ghost: 'text-gray-400 hover:text-white hover:bg-gray-800/30 border-0',
  destructive: 'bg-red-600 hover:bg-red-500 text-white border-0',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  default: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  variant = 'primary',
  size = 'default',
  children,
  className,
  disabled,
  loading,
  icon,
  iconPosition = 'left',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-950',
        buttonVariants[variant],
        buttonSizes[size],
        isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!loading && icon && iconPosition === 'left' && icon}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && icon}
    </button>
  );
}