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
        <Refresh total={total} reload={reload} />
      </div>

      <div className="text-tc-secondary flex items-center justify-between ">
        <FilterForm
          onChange={onFilterChange}
          formValues={formValues}
          reload={reload}
        />
      </div>
    </div>
  );
};

export default Filter;
