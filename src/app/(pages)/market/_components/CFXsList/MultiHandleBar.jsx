'use client';

import { cn } from '@/app/utils/classnames';
import Checkbox from '@/app/components/ui/Checkbox';
import { useMemo } from 'react';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { LoadingIcon } from '@/app/components/icons';
import { Button } from 'flowbite-react';

const Total = ({ total }) => {
  return (
    <div className="mr-[32px] text-[20px] max-md:text-[12px] max-md:mt-[5px] ">
      <span className="text-tc-secondary pr-[4px]"> Total:</span>
      <span className="text-theme font-medium">{total} USDT</span>
    </div>
  );
};

const Sweep = ({ selected, handleMultiPurchase }) => {
  const { trigger, loading } = usePromiseLoading(handleMultiPurchase);
  return (
    <div className="flex-center">
      <Button
        color="primary"
        className="px-[24px]"
        disabled={selected.length === 0 || loading}
        onClick={() => trigger()}
      >
        {loading ? <LoadingIcon /> : 'SWEEP'}
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
  const totalAmount = useMemo(() => {
    return selected.reduce((a, b) => a + Number(b.amount), 0).toFixed(4);
  }, [selected]);
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
          <Total total={totalAmount} />
        </div>
        <Sweep selected={selected} handleMultiPurchase={handleMultiPurchase} />
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
          <Total total={totalAmount} />
          <Sweep
            selected={selected}
            handleMultiPurchase={handleMultiPurchase}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiHandleBar;
