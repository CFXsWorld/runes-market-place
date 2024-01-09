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
          `flex w-full h-[48px] rounded-[4px] px-2 py-2   border  border-fill-e-primary bg-transparent
      focus:outline-none focus:ring-theme focus:ring-1  focus:border-theme focus:border-[1px]
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
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
