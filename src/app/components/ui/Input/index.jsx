'use client';

import { forwardRef } from 'react';
import { cn } from '@/app/utils/classnames';
const Input = forwardRef(
  ({ className, type, prefix, value, onChange, ...props }, ref) => {
    return (
      <input
        {...props}
        type={type}
        className={cn(
          `flex w-full h-[48px] rounded-[4px] px-2 py-2   border border-fill-separator  bg-transparent
      focus:outline-none focus:ring-theme focus:ring-1  focus:border-theme focus:border-[1px]
      disabled:bg-transparent disabled:text-slate-500 disabled:border-transparent disabled:shadow-none disabled:opacity-60
      invalid:border-red-500 invalid:text-red-600
      invalid:ring-2
      invalid:ring-offset-2
    `,
          className
        )}
        ref={ref}
        value={value === undefined ? '' : value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    );
  }
);

export default Input;
