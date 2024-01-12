'use client';

import { cn } from '@/app/utils/classnames';
import { ArrowDownIcon } from '@/app/components/icons';
import { Dropdown } from 'flowbite-react';

const Selector = ({ onChange, value, options, className }) => {
  const item = options.find((opt) => opt.value === value);
  return (
    <Dropdown
      color="outlineGray"
      label={
        <div
          className={cn(
            'font-medium text-[16px]',
            'flex items-center justify-between',
            className
          )}
        >
          <div className="flex items-center mr-[8px]">
            {item.icon && (
              <span className="text-[20px] mr-[8px]">{item.icon}</span>
            )}
            <span>{item.label}</span>
          </div>
        </div>
      }
      dismissOnClick
    >
      <div className="menu">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => {
              onChange(option.value);
            }}
            className={cn(
              'text-tc-secondary py-[12px] text-[16px] px-[16px] mb-1 cursor-pointer flex items-center',
              'hover:bg-theme hover:text-[#000]',
              { 'bg-theme text-[#000]': item.value === option.value }
            )}
          >
            {option.icon && (
              <span className="text-[20px] mr-[8px]">{option.icon}</span>
            )}
            <span>{option.label}</span>
          </div>
        ))}
      </div>
    </Dropdown>
  );
};

export default Selector;
