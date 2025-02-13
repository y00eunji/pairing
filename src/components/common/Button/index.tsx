import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: 'rectangle' | 'circle';
  variant?: 'filled' | 'outline' | 'disabled';
  isSelected?: boolean;
  width?: string;
  height?: string;
}

const SHAPES = {
  rectangle: 'rounded-[14px]',
  circle: 'rounded-full',
};

const VARIANTS = {
  filled: 'bg-gradient-to-r from-mainPink1 to-mainPink2 text-white',
  outline: 'border-2 text-mainPink1 border-mainPink1',
  disabled: 'border-2 text-gray1 border-gray-1',
};

export default function Button({
  shape = 'rectangle',
  variant = 'disabled',
  width = '60px',
  height = '30px',
  isSelected = false,
  className,
  children,
  ...restProps
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={variant === 'disabled'}
      className={cn(
        'font-16-medium flex items-center justify-center',
        width,
        height,
        SHAPES[shape],
        VARIANTS[variant],
        isSelected && 'ring-2 ring-mainPink1',
        className,
      )}
      style={{
        width:
          typeof width === 'string' && width.includes('px') ? width : undefined,
        height:
          typeof height === 'string' && height.includes('px')
            ? height
            : undefined,
      }}
      {...restProps}
    >
      {children}
    </button>
  );
}
