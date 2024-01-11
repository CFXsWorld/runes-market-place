'use client';

import { cn } from '@/app/utils/classnames';

const Checkbox = ({ children, className, value, onChange }) => {
  return (
    <div className={cn('form-control', className)}>
      <label className={cn('label cursor-pointer')}>
        <input
          type="checkbox"
          checked={value}
          onChange={onChange}
          className="checkbox checkbox-primary"
        />
        <span className="label-text pl-[5px]">{children}</span>
      </label>
    </div>
  );
};

export default Checkbox;
