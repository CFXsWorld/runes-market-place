'use client';

import Link from 'next/link';
import { CFXsIcon, XIcon, TelegramIcon } from '@/app/components/icons';
import { formatNumberWithCommas } from '@/app/utils';
import { Progress } from 'flowbite-react';

const CFXsInfo = ({ totalSupply = 0, percentage = 0 }) => {
  const maxCount = 20999965;
  const rate = (Number(totalSupply) / Number(maxCount)) * 100;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-start">
        <CFXsIcon className="md:text-[148px] max-md:text-[90px]" />
        <div className="ml-[32px] max-md:ml-[12px] max-md:flex-1">
          <div className="flex items-center justify-start max-md:mb-[12px]">
            <span className="font-bold text-[40px] mr-[24px] max-md:text-[24px]">
              CFXs
            </span>
            <Link
              href="https://twitter.com/conflux_cfxs"
              target="_blank"
              className="mr-[12px]"
            >
              <XIcon />
            </Link>
            <Link href="https://t.me/ConfluxWeb3China" target="_blank">
              <TelegramIcon />
            </Link>
          </div>
          <div className="text-tc-secondary text-[16px] mt-[8px] mb-[20px] max-md:hidden">
            CFXs is not just a Rune. It is a new paradigm of decentralized BTC
            consensus, integrating the advantages of both UTXO and account
            models.
          </div>
          <Progress
            className="progress progress-primary  w-full max-w-[400px] h-[8px] rounded-[4px]"
            progress={Number(percentage)}
            color="primary"
          />
          <div className="text-tc-secondary text-[12px] mt-[8px]">
            Total Supply:
            <span className="text-tc-primary ml-[5px] ">
              {formatNumberWithCommas(Number(totalSupply))} (
              {(rate || 0).toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
      <div className="text-tc-secondary text-[12px] mt-[12px] mb-[20px] md:hidden">
        CFXs is not just a Rune. It is a new paradigm of decentralized BTC
        consensus, integrating the advantages of both UTXO and account models.
      </div>
    </div>
  );
};

export default CFXsInfo;
