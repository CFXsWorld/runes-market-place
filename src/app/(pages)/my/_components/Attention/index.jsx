'use client';

import { FlagIcon } from '@/app/components/icons';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import { useState } from 'react';
import ClaimModal from './claim/ClaimModal';

const Attention = () => {
  const [openClaim, onOpenClaim] = useState(false);

  return (
    <div className="w-full border border-theme-non-opaque rounded-[8px] mb-[32px] max-md:mb-[16px]  p-[24px] flex items-start max-md:p-[12px]">
      {/*<ClaimModal open={openClaim} onOpen={onOpenClaim} />*/}
      <div className="pt-[5px] mr-[12px] max-md:hidden">
        <FlagIcon />
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <span className="text-theme text-[24px] font-bold mr-[24px] flex-center max-md:text-[16px] max-md:mb-[8px]">
            <div className="pt-[5px] mr-[12px] md:hidden">
              <FlagIcon />
            </div>
            TO THE NEW WORLD !
          </span>
          <Button
            color="primary"
            className="btn btn-primary h-[30px] min-h-[30px] rounded-[4px] max-md:hidden"
            onClick={() => {
              onOpenClaim(true);
            }}
          >
            CHECK ON eSPACE
          </Button>
        </div>
        <div className="text-tc-secondary pt-[10px] max-md:text-[12px]">
          Please claim the CFXs from the
          <Link
            href={`https://evm.confluxscan.io/address/0xc6e865c213c89ca42a622c5572d19f00d84d7a16`}
            target="_blank"
            className="text-theme px-[5px]"
          >
            test contract
          </Link>
          to the
          <Link
            href={`https://evm.confluxscan.io/address/0xd3a4d837e0a7b40de0b4024fa0f93127dd47b8b8`}
            target="_blank"
            className="text-theme px-[5px]"
          >
            new contract
          </Link>
          (only supported eSpace). If your CFXs are in Core Space,
          <Link
            href={`https://www.conins.io/coreClaim`}
            target="_blank"
            className="text-theme px-[5px]"
          >
            click here
          </Link>
          .
        </div>
        <Button
          color="primary"
          className="btn btn-primary  rounded-[4px] md:hidden mt-[16px] h-[32px] max-h-[32px] text-[14px]"
          onClick={() => {
            onOpenClaim(true);
          }}
        >
          CHECK ON eSPACE
        </Button>
      </div>
    </div>
  );
};

export default Attention;
