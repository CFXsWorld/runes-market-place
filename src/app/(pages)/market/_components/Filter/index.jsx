'use client';

import { ListIcon, RefreshIcon } from '@/app/components/icons';
import ReorderSelector from './ReorderSelector';
import Input from '@/app/components/ui/Input';
import Search from '@/app/components/ui/Input/Search';

const Filter = ({ total, reload }) => {
  return (
    <div className="w-full">
      <div className="my-[24px] text-theme test-[24px] flex items-center">
        <ListIcon />
        <span className="font-bold pl-[12px]">Listings</span>
      </div>

      <div className="text-tc-secondary flex items-center justify-between ">
        <div className="flex-center">
          <div className="flex-center">
            <span>Result: 1538</span>
            <RefreshIcon className="mx-[16px] cursor-pointer hover:opacity-80" />
          </div>
          <div className='flex-center max-md:hidden'>
            <ReorderSelector />
            <Input className="w-[173px] mx-[16px]" placeholder="Min Price" />
            <Input className="w-[173px] mr-[16px]" placeholder="Max Price" />
            <button className="btn btn-primary rounded-[4px]">Apply</button>
          </div>
        </div>
        <Search
          className="w-[300px]"
          placeholder="Search by ID or owner address"
        />
      </div>
    </div>
  );
};

export default Filter;
