'use client';

import Modal from '@/app/components/ui/Modal';
import { forwardRef } from 'react';
import ReorderSelector from '@/app/(pages)/market/_components/Filter/ReorderSelector';
import Input from '@/app/components/ui/Input';

const FilterModal = forwardRef(({ onChange, formValues }, ref) => {
  return (
    <Modal ref={ref} className='h-auto'>
      <div className="text-[20px]">Filter</div>
      <div className="mt-[24px] flex flex-col gap-[20px]">
        <ReorderSelector
          className='w-full'
          value={formValues.orderType}
          onChange={(orderType) => {
            onChange({ orderType });
          }}
        />
        <Input
          className="w-full"
          placeholder="Min Price"
          type="number"
          value={formValues.amountRangeStart}
          onChange={(amountRangeStart) => {
            onChange({ amountRangeStart });
          }}
        />
        <Input
          className="w-full"
          placeholder="Max Price"
          type="number"
          value={formValues.amountRangeEnd}
          onChange={(amountRangeEnd) => {
            onChange({ amountRangeEnd });
          }}
        />
        <div className="flex gap-[16px]">
          <button
            className="btn  btn-outline flex-1"
            onClick={() => {
              // trigger(purchaseOrder.amount);
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary flex-1"
            onClick={() => {
              // trigger(purchaseOrder.amount);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
});

export default FilterModal;
