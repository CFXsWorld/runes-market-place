'use client';

import { Button, Modal } from 'flowbite-react';
import { forwardRef } from 'react';
import ReorderSelector from '@/app/(pages)/market/_components/Filter/ReorderSelector';
import Input from '@/app/components/ui/Input';

const FilterModal = forwardRef(
  ({ open, onOpen, onChange, formValues, reload }, ref) => {
    return (
      <Modal show={open} onClose={() => onOpen(false)} dismissible>
        <Modal.Header>Filter</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-[20px] p-6">
            <ReorderSelector
              value={formValues.orderType}
              onChange={(orderType) => {
                onChange({ orderType });
              }}
            />
            <Input
              className="w-full"
              placeholder="Min Price"
              type="number"
              value={formValues.unit_price_start}
              onChange={(unit_price_start) => {
                onChange({ unit_price_start });
              }}
            />
            <Input
              className="w-full"
              placeholder="Max Price"
              type="number"
              value={formValues.unit_price_end}
              onChange={(unit_price_end) => {
                onChange({ unit_price_end });
              }}
            />
            <div className="flex gap-[16px]">
              <Button
                color="outline"
                className="flex-1"
                onClick={() => {
                  onOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                className="flex-1"
                onClick={() => {
                  reload();
                  onOpen(false);
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
);

export default FilterModal;
