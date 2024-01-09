'use client';

import { cn } from '@/app/utils/classnames';

const MultiHandleBar = ({ selected = [], clearAll }) => {
  return (
    <div
      className={cn(
        'fixed right-0 left-0 bottom-0 flex-center',
        'h-[78px] border border-fill-e-secondary',
        'bg-[rgba(24,24,24,0.9)] backdrop-filter-[50px]'
      )}
    >
      <div className="md:max-w-[1368px] w-full flex-center-between">
        <div className="flex-center text-tc-secondary">
          <span>{selected.length} Item</span>
          <span className="mx-[32px]">Select All</span>
          <span className="text-theme cursor-pointer" onClick={clearAll}>
            Clear
          </span>
        </div>

        <div className="flex-center">
          <div className="mr-[32px] text-[20px]">
            <span className="text-tc-secondary pr-[4px]"> Total:</span>
            <span className="text-theme font-medium">9800.12 USDT</span>
          </div>
          <button className="btn btn-primary">SWEEP</button>
        </div>
      </div>
    </div>
  );
};

export default MultiHandleBar;
