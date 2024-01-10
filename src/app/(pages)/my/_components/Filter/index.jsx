'use client';

import { FragmentIcon, MergeIcon, RefreshIcon } from '@/app/components/icons';
import Search from '@/app/components/ui/Input/Search';
import Selector from '@/app/components/ui/Selector';
import { useState } from 'react';
import Refresh from './Refresh';

const options = [
  { label: 'All', value: 0, icon: null },
  { label: 'Only merged', value: 1, icon: <MergeIcon /> },
  { label: 'Only fragments', value: 2, icon: <FragmentIcon /> },
];

const Filter = ({ total, reload }) => {
  const [value, setValue] = useState(1);
  const onChange = (type) => {
    setValue(type);
  };
  return (
    <div className="flex flex-col">
      <div className="md:hidden w-full flex items-center justify-end mb-[10px]">
        <Refresh />
      </div>
      <div className="text-tc-secondary flex items-center justify-between ">
        <div className="flex-center max-md:mr-[16px]">
          <Refresh className="max-md:hidden" />
          <Selector
            options={options}
            value={value}
            onChange={onChange}
            className="w-[254px] max-md:w-full"
          />
        </div>
        <Search className="w-[300px] max-md:w-full max-md:flex-1 max-md:max-w-[280px]" placeholder="Search by ID" />
      </div>
    </div>
  );
};

export default Filter;
