'use client';

import { cn } from '@/app/utils/classnames';
import { PlusIcon, ReduceIcon, WarningIcon } from '@/app/components/icons';
import { TextInput } from 'flowbite-react';

const CustomSplit = ({
  items,
  delItem,
  onCustomValueChange,
  addItem,
  isValidAmount,
}) => {
  const splitCount = items.length;
  return (
    <div>
      <div className="max-h-[300px] overflow-y-auto p-[20px] bg-fill-e-primary mb-[24px] flex flex-col gap-[16px] rounded-[8px] mt-[5px]">
        {(items || []).map((item, index) => (
          <div key={item.id} className="flex flex items-center">
            <div
              className=" flex-center w-[48px] h-[48px] border border-fill-separator text-[24px] cursor-pointer border-r-transparent hover:text-white"
              onClick={() => {
                delItem(item);
              }}
            >
              <ReduceIcon />
            </div>
            <div className="flex-1">
              <TextInput
                type="text"
                onChange={(e) => {
                  onCustomValueChange(e.target.value, index);
                }}
                value={items[index].amount}
                placeholder="Must be an integer > 1 or < 1000"
                required
                color="primary"
              />
            </div>
            <div
              className="flex-center  w-[48px] h-[48px] border border-fill-separator text-[24px] cursor-pointer border-l-transparent hover:text-white"
              onClick={() => {
                addItem(item);
              }}
            >
              <PlusIcon />
            </div>
          </div>
        ))}
      </div>
      <div className="flex-center-between mb-[10px]">
        <span className="text-tc-secondary">Count</span>
        <span
          className={cn('text-theme font-medium', {
            'text-red-500': splitCount > 24,
            'text-status-warning': splitCount === 24,
          })}
        >
          {splitCount}
        </span>
      </div>
      <div className="flex-center-between mb-[20px]">
        <span className="text-tc-secondary  text-[14px]">
          Up to 24 customized items. The amount of new CFXs shards is the the
          customized amount.
        </span>
      </div>
      {!isValidAmount && (
        <div className="mt-[10px] bg-theme-non-opaque py-[12px] px-[16px] flex items-center rounded-[4px]">
          <WarningIcon />
          <span className="text-theme text-[14px] ml-[10px]">
            Total cannot exceed the amount of the CFXs.
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomSplit;
