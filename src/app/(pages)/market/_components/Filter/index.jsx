'use client';

import { FilterIcon, ListIcon } from '@/app/components/icons';

import Search from '@/app/components/ui/Input/Search';
import Refresh from '@/app/(pages)/market/_components/Filter/Refresh';
import FilterForm from '@/app/(pages)/market/_components/Filter/FilterForm';
import useFilter from '@/app/(pages)/market/_components/Filter/useFilter';

const Filter = ({ total, reload, filter, setFilter }) => {
  const { onFilterChange, formValues } = useFilter({ filter, setFilter });
  return (
    <div className="w-full">
      <div className="my-[24px] text-theme test-[24px] flex items-center justify-between">
        <div className="flex-center">
          <ListIcon />
          <span className="font-bold pl-[12px]">Listings</span>
        </div>
        <Refresh className="md:hidden" total={total} reload={reload} />
      </div>

      <div className="text-tc-secondary flex items-center justify-between ">
        <div className="flex-center max-md:hidden">
          <Refresh total={total} reload={reload} />
          <FilterForm onChange={onFilterChange} formValues={formValues} reload={reload}/>
        </div>
        <div className="flex items-center justify-end flex-1">
          <Search
            className="w-full  max-w-[300px] max-md:max-w-[280px]"
            placeholder="Search by ID or owner address"
          />
          <FilterIcon className="text-[42px] ml-[12px] cursor-pointer md:hidden" />
        </div>
      </div>
    </div>
  );
};

export default Filter;
