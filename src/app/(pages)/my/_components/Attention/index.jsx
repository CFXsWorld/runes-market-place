'use client';

import { FlagIcon } from '@/app/components/icons';
import { Button } from 'flowbite-react';
import useEnv from '@/app/hooks/useEnv';
import Link from 'next/link';
import { useState } from 'react';
import ClaimModal from './claim/ClaimModal';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMyCFSxList } from '@/app/services';

const Attention = () => {
  const [openClaim, onOpenClaim] = useState(false);
  const { eSpaceExplor, oldContractAddress, newContractAddress } = useEnv();

  const { isMutating, trigger: getData } = useSWRMutation(
    APIs.MARKET_LIST,
    getMyCFSxList
  );

  return (
    <div className="w-full border border-theme-non-opaque rounded-[8px] mb-[32px] max-md:mb-[16px]  p-[24px] flex items-start">
      <ClaimModal
        open={openClaim}
        onOpen={onOpenClaim}
        getData={getData}
        isMutating={isMutating}
      />
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
        <div className="text-tc-secondary pt-[10px]">
          Please claim the CFXs from the
          <Link
            href={`${eSpaceExplor}/${oldContractAddress}`}
            target="_blank"
            className="text-theme px-[5px]"
          >
            test contract
          </Link>
          to the
          <Link
            href={`${eSpaceExplor}/${newContractAddress}`}
            target="_blank"
            className="text-theme px-[5px]"
          >
            new contract
          </Link>
          (only supported eSpace). If your CFXs are in Core Space,
          <Link
            href={`${eSpaceExplor}/${newContractAddress}`}
            target="_blank"
            className="text-theme px-[5px]"
          >
            click here
          </Link>
          .
        </div>
        <Button
          color="primary"
          className="btn btn-primary  rounded-[4px] md:hidden mt-[16px]"
        >
          CHECK ON eSPACE
        </Button>
      </div>
    </div>
  );
};

export default Attention;
