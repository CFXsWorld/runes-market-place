'use client';

import { forwardRef } from 'react';
import { cn } from '@/app/utils/classnames';

const Dropdown = forwardRef(
  ({ align, className, children, renderTrigger }, ref) => {
    return (
      <div className="dropdown" ref={ref}>
        <div tabIndex={0} role="button" className='mb-1'>
          {renderTrigger()}
        </div>
        <div
          tabIndex={0}
          className={cn(
            'dropdown-content menu min-w-[254px] min-h-[50px]',
            'bg-fill-secondary rounded-[4px] p-0',
            'border border-fill-e-primary',
            className
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

export default Dropdown;
