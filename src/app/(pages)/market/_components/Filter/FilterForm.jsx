'use client';

import ReorderSelector from '@/app/(pages)/market/_components/Filter/ReorderSelector';
import Input from '@/app/components/ui/Input';
import Search from '@/app/components/ui/Input/Search';
import { FilterIcon } from '@/app/components/icons';
import FilterModal from '@/app/(pages)/market/_components/Filter/FilterModal';
import { useRef, useState } from 'react';
import { Button } from 'flowbite-react';

const FilterForm = ({ formValues, onChange, reload }) => {
  const [open, onOpen] = useState(false);
  return (
    <div className="flex-center">
      <div className="flex-center max-md:hidden">
        <ReorderSelector
          value={formValues.orderType}
          onChange={(orderType) => {
            onChange({ orderType });
          }}
        />
        <Input
          className="w-[173px] mx-[16px]"
          placeholder="Min Price"
          type="number"
          value={formValues.amountRangeStart}
          onChange={(amountRangeStart) => {
            onChange({ amountRangeStart });
          }}
        />
        <Input
          className="w-[173px] mr-[16px]"
          placeholder="Max Price"
          type="number"
          value={formValues.amountRangeEnd}
          onChange={(amountRangeEnd) => {
            onChange({ amountRangeEnd });
          }}
        />
      </div>
      <Search
        className="md:max-w-[320px] max-md:max-w-[280px]"
        placeholder="Search by ID or owner address"
      />
      <FilterIcon
        className="text-[42px] ml-[12px] cursor-pointer md:hidden"
        onClick={() => {
          onOpen(true);
        }}
      />
      <Button
        color="primary"
        className="rounded-[4px] ml-[16px]"
        onClick={() => {
          reload();
        }}
      >
        Apply
      </Button>
      <FilterModal
        open={open}
        onOpen={onOpen}
        formValues={formValues}
        onChange={onChange}
        reload={reload}
      />
    </div>
  );
};

export default FilterForm;
