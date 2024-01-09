'use client';

import { FragmentIcon, MergeIcon, RefreshIcon } from '@/app/components/icons';
import Search from '@/app/components/ui/Input/Search';
import Selector from '@/app/components/ui/Selector';
import { useState } from "react";

const options = [
  { label: 'All', value: 0, icon: null },
  { label: 'Only merged', value: 1, icon: <MergeIcon /> },
  { label: 'Only fragments', value: 2, icon: <FragmentIcon /> },
];

const Filter = ({ total, reload }) => {
  const [value, setValue] = useState(1);
  const onChange = (type) => {
    console.log(type);
    setValue(type);
  };
  return (
    <div className="text-tc-secondary flex items-center justify-between ">
      <div className="flex-center">
        <span>Balance: 1538</span>
        <RefreshIcon className="mx-[16px] cursor-pointer hover:opacity-80" />
        <Selector
          options={options}
          value={value}
          onChange={onChange}
          className="w-[254px]"
        />
      </div>
      <Search
        className="w-[300px]"
        placeholder="Search by ID"
      />
    </div>
  );
};

export default Filter;
