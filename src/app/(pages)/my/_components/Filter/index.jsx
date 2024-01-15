'use client';

import { FragmentIcon, MergeIcon } from '@/app/components/icons';
import Search from '@/app/components/ui/Input/Search';
import Selector from '@/app/components/ui/Selector';
import Refresh from './Refresh';
import { Button } from 'flowbite-react';

const options = [
  { label: 'All', value: 0, icon: null },
  { label: 'Only merged', value: 1, icon: <MergeIcon /> },
  { label: 'Only fragments', value: 2, icon: <FragmentIcon /> },
];

const Filter = ({ total, reload, filter, setFilter }) => {
  return (
    <div className="flex flex-col">
      <div className="text-tc-secondary flex items-center gap-[16px] max-md:gap-[6px] ">
        <div className="flex-center max-md:mr-[16px] max-sm:mr-[4px]">
          <Selector
            options={options}
            value={filter.merged}
            onChange={(v) => {
              setFilter({ ...filter, merged: v });
            }}
            className="w-[254px] max-md:w-full line-clamp-1 max-sm:w-[60px]"
          />
        </div>
        <Search
          className="w-[300px] max-md:w-full max-md:flex-1 max-md:max-w-[280px] min-w-[120px]"
          placeholder="Search by ID"
          value={filter.id}
          onChange={(v) => {
            setFilter({ ...filter, id: v });
          }}
        />
        <Button
          color="primary"
          className="btn btn-primary rounded-[4px] ml-[16px] max-md:ml-[8px]"
          onClick={() => {
            reload();
          }}
        >
          Apply
        </Button>
      </div>
      <div className=" w-full flex items-center mt-[16px]">
        <Refresh total={total} reload={reload} />
      </div>
    </div>
  );
};

export default Filter;
