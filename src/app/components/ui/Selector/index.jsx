'use client';

import { cn } from '@/app/utils/classnames';
import { Dropdown } from 'flowbite-react';

const Selector = ({
  onChange,
  value,
  options,
  className,
  type = 'outlineGray',
  placeholder,
}) => {
  const item = options.find((opt) => opt.value === value);
  return (
    <Dropdown
      color={type}
      label={
        <div
          className={cn(
            'font-medium text-[16px] w-full',
            'flex items-center justify-between',
            className
          )}
        >
          {placeholder && !value ? (
            placeholder
          ) : (
            <div className="flex items-center mr-[8px] max-sm:mr-[4px]">
              {item?.icon && (
                <span className="text-[20px] mr-[8px] max-sm:text-[14px]">
                  {item.icon}
                </span>
              )}
              {item?.label && (
                <span className="line-clamp-1 max-sm:text-[12px]">
                  {item.label}
                </span>
              )}
            </div>
          )}
        </div>
      }
      dismissOnClick
    >
      <div>
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => {
              if (!option.disabled) {
                onChange?.(option.value);
              }
            }}
            className={cn(
              'text-tc-secondary py-[12px] text-[16px] px-[16px] mb-1 cursor-pointer flex items-center',
              { 'bg-theme text-[#000]': item?.value === option.value },
              { 'hover:text-[#000] hover:bg-theme': !option.disabled },
              { 'opacity-70': option.disabled }
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
