'use client';

import { cn } from '@/app/utils/classnames';
import Checkbox from '@/app/components/ui/Checkbox';

const Total = () => {
  return (
    <div className="mr-[32px] text-[20px] max-md:text-[12px] max-md:mt-[5px] ">
      <span className="text-tc-secondary pr-[4px]"> Total:</span>
      <span className="text-theme font-medium">9800.12 USDT</span>
    </div>
  );
};

const Sweep = ({ selected }) => {
  return (
    <div className="flex-center">
      <button
        className="btn btn-primary px-[24px]"
        disabled={selected.length === 0}
      >
        SWEEP
      </button>
    </div>
  );
};

const SelectedCount = ({ selected }) => {
  return (
    <span className="text-tc-secondary max-md:text-[12px] min-w-[50px]">
      {selected.length} Item
    </span>
  );
};

const CheckBox = () => {
  return (
    <Checkbox className="md:mx-[32px] text-tc-secondary max-md:text-[12px] max-md:mr-[16px]">
      Select All
    </Checkbox>
  );
};

const MultiHandleBar = ({ selected = [], clearAll }) => {
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
            <CheckBox />
            <SelectedCount selected={selected} />
          </div>
          <Total />
        </div>
        <Sweep selected={selected} />
      </div>
      <div className="md:max-w-[1368px] w-full flex-center-between max-md:hidden">
        <div className="flex-center text-tc-secondary">
          <SelectedCount selected={selected} />
          <CheckBox />
          <span className="text-theme cursor-pointer" onClick={clearAll}>
            Clear
          </span>
        </div>
        <div className="flex-center">
          <Total />
          <Sweep selected={selected} />
        </div>
      </div>
    </div>
  );
};

export default MultiHandleBar;
