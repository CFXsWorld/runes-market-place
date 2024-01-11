'use client';

import Selector from '@/app/components/ui/Selector';
import {
  AscIcon,
  DescIcon,
  EndingIcon,
  FragmentIcon,
  MergeIcon,
  TimeIcon,
} from '@/app/components/icons';
import { cn } from '@/app/utils/classnames';

const options = [
  { label: 'Price low to high', value: 'ASC', icon: <AscIcon /> },
  { label: 'Price high to low', value: 'DESC', icon: <DescIcon /> },
  { label: 'Recently listed', value: 'RECENTLY', icon: <TimeIcon /> },
  { label: 'Ending soon', value: 'ENDING', icon: <EndingIcon /> },
  { label: 'Only merged', value: 'MERGED', icon: <MergeIcon /> },
  { label: 'Only fragments', value: 'FRAGMENT', icon: <FragmentIcon /> },
];

const ReorderSelector = ({ value, onChange, className }) => {
  return (
    <Selector
      options={options}
      value={value}
      onChange={onChange}
      className={cn('w-[254px]', className)}
    />
  );
};

export default ReorderSelector;
