'use client';

import { RefreshIcon } from '@/app/components/icons';
import Dropdown from '@/app/components/ui/Dropdown';
import ReorderSelector from '@/app/(pages)/market/_components/Filter/ReorderSelector';

const Filters = ({ total, reload }) => {
  return (
    <div className="text-tc-secondary flex items-center ">
      <span>Result: 1538</span>
      <RefreshIcon className="mx-[16px] cursor-pointer hover:opacity-80" />
      <ReorderSelector />
    </div>
  );
};

export default Filters;
