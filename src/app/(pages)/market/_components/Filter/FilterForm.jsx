'use client';

import ReorderSelector from '@/app/(pages)/market/_components/Filter/ReorderSelector';
import Input from '@/app/components/ui/Input';

const FilterForm = ({ formValues, onChange, reload }) => {
  return (
    <div className="flex-center">
      <ReorderSelector
        value={formValues.ao}
        onChange={(ao) => {
          onChange({ ao });
        }}
      />
      <Input
        className="w-[173px] mx-[16px]"
        placeholder="Min Price"
        type='number'
        value={formValues.amountRangeStart}
        onChange={(amountRangeStart) => {
          onChange({ amountRangeStart });
        }}
      />
      <Input
        className="w-[173px] mr-[16px]"
        placeholder="Max Price"
        type='number'
        value={formValues.amountRangeEnd}
        onChange={(amountRangeEnd) => {
          onChange({ amountRangeEnd });
        }}
      />
      <button
        className="btn btn-primary rounded-[4px]"
        onClick={() => {
          reload();
        }}
      >
        Apply
      </button>
    </div>
  );
};

export default FilterForm;
