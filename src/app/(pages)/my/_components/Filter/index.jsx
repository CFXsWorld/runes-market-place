'use client';

import { FragmentIcon, MergeIcon, RefreshIcon } from '@/app/components/icons';
import Search from '@/app/components/ui/Input/Search';
import Selector from '@/app/components/ui/Selector';
import { useState } from 'react';
import Refresh from './Refresh';
import { Button } from "flowbite-react";

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
      <div className="text-tc-secondary flex items-center gap-[16px] ">
        <div className="flex-center max-md:mr-[16px]">
          <Selector
            options={options}
            value={value}
            onChange={onChange}
            className="w-[254px] max-md:w-full"
          />
        </div>
        <Search
          className="w-[300px] max-md:w-full max-md:flex-1 max-md:max-w-[280px]"
          placeholder="Search by ID"
        />
        <Button
          color='primary'
          className="btn btn-primary rounded-[4px] ml-[16px]"
          onClick={() => {
            reload();
          }}
        >
          Apply
        </Button>
      </div>
      <div className=" w-full flex items-center mt-[16px]">
        <Refresh total={total} reload={reload}/>
      </div>
    </div>
  );
};

export default Filter;
