'use client';

import Selector from '@/app/components/ui/Selector';
import { useState } from 'react';
import {
  AscIcon,
  DescIcon,
  EndingIcon,
  FragmentIcon,
  MergeIcon,
  TimeIcon,
} from '@/app/components/icons';

const options = [
  { label: 'Price low to high', value: 1, icon: <AscIcon /> },
  { label: 'Price high to low', value: 2, icon: <DescIcon /> },
  { label: 'Recently listed', value: 3, icon: <TimeIcon /> },
  { label: 'Ending soon', value: 4, icon: <EndingIcon /> },
  { label: 'Only merged', value: 5, icon: <MergeIcon /> },
  { label: 'Only fragments', value: 6, icon: <FragmentIcon /> },
];

const ReorderSelector = () => {
  const [value, setValue] = useState(1);
  const onChange = (type) => {
    console.log(type);
    setValue(type);
  };

  return (
    <Selector
      options={options}
      value={value}
      onChange={onChange}
      className="w-[254px]"
    />
  );
};

export default ReorderSelector;
