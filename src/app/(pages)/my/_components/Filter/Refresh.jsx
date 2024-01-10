'use client';

import { RefreshIcon } from '@/app/components/icons';
import { cn } from '@/app/utils/classnames';

const Refresh = ({ className }) => {
  return (
    <div className={cn('flex-center', className)}>
      <span className="text-tc-secondary flex-shrink-0">Balance: 1538</span>
      <RefreshIcon className="mx-[16px] cursor-pointer hover:opacity-80 max-md:mr-0" />
    </div>
  );
};

export default Refresh;
