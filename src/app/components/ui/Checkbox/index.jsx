'use client';

import { cn } from '@/app/utils/classnames';

const Checkbox = ({ children, className, value, onChange }) => {
  return (
    <div className={cn('form-control', className)}>
      <label className={cn('label cursor-pointer flex-center')}>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => {
            onChange?.(e.target.checked);
          }}
          className="outline-none cursor-pointer h-[18px] w-[18px] bg-transparent border border-theme"
        />
        <span className="label-text pl-[5px]">{children}</span>
      </label>
    </div>
  );
};

export default Checkbox;
