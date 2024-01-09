'use client';

import Dropdown from '@/app/components/ui/Dropdown';
import { cn } from '@/app/utils/classnames';
import { ArrowDownIcon } from '@/app/components/icons';

const Selector = ({ onChange, value, options, className }) => {
  const item = options.find((opt) => opt.value === value);
  return (
    <Dropdown
      renderTrigger={() => (
        <div
          className={cn(
            'btn bg-transparent border border-fill-e-primary group',
            'rounded-[4px] hover:bg-transparent flex items-center justify-between px-[16px]',
            className
          )}
        >
          <div className="flex items-center mr-[8px]">
            {item.icon && (
              <span className="text-[20px] mr-[8px]">{item.icon}</span>
            )}
            <span>{item.label}</span>
          </div>
          <ArrowDownIcon
            className=" ml-1 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </div>
      )}
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
