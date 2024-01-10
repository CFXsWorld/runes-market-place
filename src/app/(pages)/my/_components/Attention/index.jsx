'use client';

import { FlagIcon } from '@/app/components/icons';

const Attention = () => {
  return (
    <div className="w-full border border-theme-non-opaque rounded-[8px] mb-[32px] max-md:mb-[16px]  p-[24px] flex items-start">
      <div className="pt-[5px] mr-[12px] max-md:hidden">
        <FlagIcon />
      </div>

      <div className="flex flex-col">
        <div className="flex">
          <span className="text-theme text-[24px] font-bold mr-[24px] flex-center max-md:text-[20px] max-md:mb-[8px]">
            <div className="pt-[5px] mr-[12px] md:hidden">
              <FlagIcon />
            </div>
            TO THE NEW WORLD !
          </span>
          <button className="btn btn-primary h-[30px] min-h-[30px] rounded-[4px] max-md:hidden">
            CHECK ON eSPACE
          </button>
        </div>
        <div className="text-tc-secondary">
          Please claim the CFXs from the
          <span className="text-theme"> test contract </span> to the
          <span className="text-theme"> new contract </span> (only supported
          eSpace). If your CFXs are in Core Space,
          <span className="text-theme">click here.</span>
        </div>
        <button className="btn btn-primary  rounded-[4px] md:hidden mt-[16px]">
          CHECK ON eSPACE
        </button>
      </div>
    </div>
  );
};

export default Attention;
