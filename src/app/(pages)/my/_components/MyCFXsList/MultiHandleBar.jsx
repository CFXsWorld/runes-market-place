'use client';

import { cn } from '@/app/utils/classnames';
import Checkbox from '@/app/components/ui/Checkbox';
import { SplitIcon, TransferIcon } from '@/app/components/icons';
import { Button } from 'flowbite-react';

const Action = ({ selected, onMerge, onTransfer, onBatchListing }) => {
  return (
    <div className="flex-center gap-[16px] max-md:flex-col max-md:w-full">
      <div className="flex center gap-[16px] max-md:w-full max-md:mt-[12px]">
        <Button
          color="outline"
          disabled={selected.length === 0}
          className="max-md:text-[12px] btn btn-outline btn-primary  px-[8px] text-[14px] font-normal max-md:flex-1"
          onClick={onMerge}
        >
          <SplitIcon />
          MERGE
        </Button>
        <Button
          color="outline"
          disabled={selected.length === 0}
          className="max-md:text-[12px] btn btn-outline btn-primary px-[8px] text-[14px] font-normal max-md:flex-1"
          onClick={onTransfer}
        >
          <TransferIcon />
          TRANSFER
        </Button>
      </div>
      <Button
        color="primary"
        className="max-md:w-full px-[24px]"
        disabled={selected.length === 0}
        onClick={onBatchListing}
      >
        BATCH LISTING
      </Button>
    </div>
  );
};

const SelectedCount = ({ selected }) => {
  return (
    <span className="text-tc-secondary max-md:text-[12px] w-[80px]">
      {selected.length} Item
    </span>
  );
};

const CheckBox = ({ onChange, value }) => {
  return (
    <Checkbox
      value={value}
      onChange={onChange}
      className="md:mr-[32px] md:ml-[8px] text-tc-secondary max-md:text-[12px] max-md:mr-[16px]"
    >
      Select All
    </Checkbox>
  );
};

const MultiHandleBar = ({
  selected = [],
  clearAll,
  selectAll,
  onMerge,
  onTransfer,
  onBatchListing,
  checkAll,
}) => {
  return (
    <div
      className={cn(
        'fixed right-0 left-0 bottom-0 flex-center  max-md:px-[16px] md:px-[24px]',
        'h-[78px] border border-fill-e-secondary max-md:h-[176px]',
        'bg-[rgba(24,24,24,0.9)] backdrop-filter-[50px]'
      )}
    >
      <div className="md:hidden w-full flex flex-col items-start">
        <div className="flex items-start justify-start flex-col">
          <div className="flex items-center">
            <CheckBox onChange={selectAll} value={checkAll} />
            <SelectedCount selected={selected} />
          </div>
        </div>
        <Action
          selected={selected}
          onMerge={onMerge}
          onTransfer={onTransfer}
          onBatchListing={onBatchListing}
        />
      </div>
      <div className="md:max-w-[1368px] w-full flex-center-between max-md:hidden">
        <div className="flex-center text-tc-secondary">
          <SelectedCount selected={selected} />
          <CheckBox onChange={selectAll} value={checkAll} />
          <span className="text-theme cursor-pointer" onClick={clearAll}>
            Clear
          </span>
        </div>
        <div className="flex-center">
          <Action
            selected={selected}
            onMerge={onMerge}
            onTransfer={onTransfer}
            onBatchListing={onBatchListing}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiHandleBar;
