'use client';

import { ListIcon } from '@/app/components/icons';

import Refresh from '@/app/(pages)/market/_components/Filter/Refresh';
import FilterForm from '@/app/(pages)/market/_components/Filter/FilterForm';
import useFilter from '@/app/(pages)/market/_components/Filter/useFilter';

const Filter = ({ total, reload, filter, setFilter }) => {
  const { onFilterChange, formValues } = useFilter({ filter, setFilter });
  return (
    <div className="w-full">
      <div className="my-[6px] text-theme text-[14px] flex items-center justify-between">
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
