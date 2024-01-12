'use client';

import { RefreshIcon } from '@/app/components/icons';
import { cn } from '@/app/utils/classnames';

const Refresh = ({ className, reload, total }) => {
  return (
    <div className={cn('flex-center', className)}>
      <span className="text-tc-secondary flex-shrink-0">
        Balance: {total || 0}
      </span>
      <RefreshIcon
        className="mx-[16px] cursor-pointer hover:opacity-80 max-md:mr-0"
        onClick={() => {
          reload();
        }}
      />
    </div>
  );
};

export default Refresh;
