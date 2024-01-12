'use client';

import { cn } from '@/app/utils/classnames';
import Checkbox from '@/app/components/ui/Checkbox';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { LoadingIcon, SplitIcon, TransferIcon } from '@/app/components/icons';
import Datepicker from "react-tailwindcss-datepicker";
import { useState } from "react";

const Action = ({ selected, handleMultiPurchase }) => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11)
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  }

  const { trigger, loading } = usePromiseLoading(handleMultiPurchase);
  return (
    <div className="flex-center gap-[16px]">
      <div className="flex center gap-[16px]">
        <Datepicker
          value={value}
          onChange={handleValueChange}
        />
        <button className="max-sm:text-[12px] btn btn-outline btn-primary  px-[8px] text-[14px] font-normal">
          <SplitIcon />
          MERGE
        </button>
        <button className="max-sm:text-[12px] btn btn-outline btn-primary px-[8px] text-[14px] font-normal">
          <TransferIcon />
          TRANSFER
        </button>
      </div>
      <button
        className="btn btn-primary px-[24px]"
        disabled={selected.length === 0 || loading}
        onClick={() => trigger()}
      >
        {loading ? <LoadingIcon /> : 'BATCH LISTING'}
      </button>
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

const CheckBox = ({ onChange }) => {
  return (
    <Checkbox
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
  handleMultiPurchase,
}) => {
  return (
    <div
      className={cn(
        'fixed right-0 left-0 bottom-0 flex-center  max-md:px-[16px] md:px-[24px]',
        'h-[78px] border border-fill-e-secondary',
        'bg-[rgba(24,24,24,0.9)] backdrop-filter-[50px]'
      )}
    >
      <div className="md:hidden w-full flex items-center justify-between">
        <div className="flex items-start justify-start flex-col">
          <div className="flex items-center">
            <CheckBox onChange={selectAll} />
            <SelectedCount selected={selected} />
          </div>
        </div>
        <Action selected={selected} handleMultiPurchase={handleMultiPurchase} />
      </div>
      <div className="md:max-w-[1368px] w-full flex-center-between max-md:hidden">
        <div className="flex-center text-tc-secondary">
          <SelectedCount selected={selected} />
          <CheckBox onChange={selectAll} />
          <span className="text-theme cursor-pointer" onClick={clearAll}>
            Clear
          </span>
        </div>
        <div className="flex-center">
          <Action
            selected={selected}
            handleMultiPurchase={handleMultiPurchase}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiHandleBar;
