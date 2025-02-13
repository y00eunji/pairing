import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';

const VARIANTS = {
  small: 'rounded-[20px] px-4 py-2 text-center',
  medium: 'rounded-[14px] w-[50%] h-[52px] text-center',
  wide: 'rounded-[14px] w-full h-[52px] pl-[15px] text-left',
} as const;

type ChipButtonVariant = keyof typeof VARIANTS;

interface ChipButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ChipButtonVariant;
  isSelected?: boolean;
}

export default function ChipButton({
  variant = 'small',
  isSelected = false,
  className,
  children,
  ...restprops
}: PropsWithChildren<ChipButtonProps>) {
  return (
    <button
      type="button"
      className={cn(
        'text-[18px] border',
        VARIANTS[variant],
        isSelected
          ? 'border-mainPink1 text-mainPink1'
          : 'border-gray1 text-gray1',
        className,
      )}
      {...restprops}
    >
      {children}
    </button>
  );
}
