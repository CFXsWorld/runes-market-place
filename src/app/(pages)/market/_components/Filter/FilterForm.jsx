'use client';


import ReorderSelector from '@/app/(pages)/market/_components/Filter/ReorderSelector';
import Input from '@/app/components/ui/Input';

const FilterForm = () => {
  return (
    <div className="flex-center">
      <ReorderSelector />
      <Input className="w-[173px] mx-[16px]" placeholder="Min Price" />
      <Input className="w-[173px] mr-[16px]" placeholder="Max Price" />
      <button className="btn btn-primary rounded-[4px]">Apply</button>
    </div>
  );
};

export default FilterForm;
