'use client';

import { RefreshIcon } from '@/app/components/icons';
import ReorderSelector from '@/app/(pages)/market/_components/Filter/ReorderSelector';
import Input from '@/app/components/ui/Input';
import Search from '@/app/(pages)/market/_components/Filter/Search';

const Filters = ({ total, reload }) => {
  return (
    <div className="text-tc-secondary flex items-center justify-between ">
      <div className="flex-center">
        <span>Result: 1538</span>
        <RefreshIcon className="mx-[16px] cursor-pointer hover:opacity-80" />
        <ReorderSelector />
        <Input className="w-[173px] mx-[16px]" placeholder="Min Price" />
        <Input className="w-[173px] mr-[16px]" placeholder="Max Price" />

        <button className="btn btn-primary rounded-[4px]">Apply</button>
      </div>
      <Search
        className="w-[300px]"
        placeholder="Search by ID or owner address"
      />
    </div>
  );
};

export default Filters;
