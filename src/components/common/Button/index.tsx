import { ButtonHTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'large' | 'small';
  variant?: 'filled' | 'outline' | 'disabled';
  isSelected?: boolean;
}

const SIZE = {
  large: 'w-full h-[52px] rounded-[14px]',
  small: 'w-[55px] h-[35px] rounded-full',
};

const VARIANTS = {
  filled: 'bg-gradient-to-r from-mainPink1 to-mainPink2 text-white',
  outline: 'border-2 text-mainPink1 border-mainPink1',
  disabled: 'border-2 text-gray1 border-gray-1',
};

export default function Button({
  size = 'small',
  variant = 'disabled',
  isSelected = false,
  className,
  children,
  ...restProps
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'text-[16px] font-semiBold',
        SIZE[size],
        VARIANTS[variant],
        isSelected && 'ring-2 ring-mainPink1',
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}
