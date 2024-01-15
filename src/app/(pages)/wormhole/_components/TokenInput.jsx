'use client';

import Input from '@/app/components/ui/Input';
import TokenTypeSelector from '@/app/(pages)/wormhole/_components/TokenTypeSelector';

const TokenInput = ({ label }) => {
  return (
    <div className="w-full flex flex-col px-[20px] py-[16px] max-md:px-[12px] bg-fill-e-primary">
      <div className="text-tc-secondary md:mb-[8px] max-md:mb-[4px]">
        {label}
      </div>
      <div className="flex-center-between">
        <Input
          type="text"
          className="flex-1 border-none outline-none bg-transparent focus:border-transparent focus:ring-transparent text-[24px] text-white"
          placeholder="0"
        />
      <div>
        <TokenTypeSelector />
      </div>
      </div>
    </div>
  );
};

export default TokenInput;
