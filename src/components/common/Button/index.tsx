import { ButtonHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: 'rectangle' | 'circle';
  variant?: 'filled' | 'outline' | 'disabled';
  isSelected?: boolean;
  width?: number;
  height?: number;
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
  width = 60,
  height = 30,
  isSelected = false,
  className,
  children,
  ...restProps
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'font-16-medium flex items-center justify-center',
        `w-[${width}px] h-[${height}px]`,
        SHAPES[shape],
        VARIANTS[variant],
        isSelected && 'ring-2 ring-mainPink1',
        className,
      )}
      style={{ width, height }}
      {...restProps}
    >
      {children}
    </button>
  );
}
