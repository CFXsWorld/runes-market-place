'use client';

import { RefreshIcon } from '@/app/components/icons';
import { cn } from '@/app/utils/classnames';

const Refresh = ({ className, total, reload }) => {
  return (
    <div className={cn('flex-center  flex-shrink-0', className)}>
      <span className="text-tc-secondary">Result: {total}</span>
      <RefreshIcon
        className="mx-[16px] cursor-pointer hover:opacity-80 max-md:mr-0"
        onClick={reload}
      />
    </div>
  );
};

export default Refresh;
