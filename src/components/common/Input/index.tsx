'use client';

import type { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

interface Props extends ComponentProps<'input'> {
  inputRef?: React.Ref<HTMLInputElement>;
  wrapperClassName?: string;
  inputClassName?: string;
  leftIcon?: React.ReactNode;
}

export default function Input({
  inputRef,
  wrapperClassName,
  inputClassName,
  leftIcon,
  ...restProps
}: Props) {
  return (
    <div className={cn('relative flex items-center w-full', wrapperClassName)}>
      {leftIcon && (
        <span className="absolute left-3 flex items-center">{leftIcon}</span>
      )}
      <input
        ref={inputRef}
        {...restProps}
        className={cn(
          'w-full h-full outline-none caret-[#FF85A2] text-[14px] py-[10px] pr-4 text-black rounded-[20px] bg-gray3',
          leftIcon ? 'pl-10' : 'pl-[10px]',
          inputClassName,
        )}
      />
    </div>
  );
}
