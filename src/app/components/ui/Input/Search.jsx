'use client';

import { forwardRef } from 'react';
import { cn } from '@/app/utils/classnames';
import { SearchIcon } from '@/app/components/icons';
const Search = forwardRef(
  ({ className, type, value, onChange, ...props }, ref) => {
    return (
      <div className={cn('relative w-full', className)}>
        <div
          className={cn(
            'left-0 top-0 absolute flex-center ',
            'overflow-hidden text-tc-secondary  w-[48px] h-[40px]'
          )}
        >
          <SearchIcon className="text-[20px]" />
        </div>
        <input
          {...props}
          type={type}
          className={cn(
            `flex w-full rounded-[4px] px-2 py-2   border  border-fill-e-primary bg-transparent
      focus:outline-none focus:ring-theme focus:ring-1  focus:border-theme focus:border-[1px]
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-500 invalid:text-red-600
      invalid:ring-2
      invalid:ring-offset-2
    `,
            className,
            'pl-[48px]'
          )}
          ref={ref}
          value={value === undefined ? '' : value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
    );
  }
);

export default Search;
