'use client';

import { CFXsIcon, XIcon, TelegramIcon } from '@/app/components/icons';
import Link from 'next/link';

const Menu = () => {
  return (
    <div className="flex items-center justify-start">
      <CFXsIcon />
      <div className="ml-[32px]">
        <div className="flex items-center justify-start">
          <span className="font-bold text-[40px] mr-[24px]">CFXs</span>
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
        <div className="text-tc-secondary text-[16px] mt-[8px] mb-[20px]">
          CFXs is not just a Rune. It is a new paradigm of decentralized BTC
          consensus, integrating the advantages of both UTXO and account models.
        </div>
        <div className="w-[400px] h-[8px] bg-theme rounded-[4px]" />
        <div className="text-tc-secondary text-[12px] mt-[8px]">
          Total Supply:
          <span className="text-tc-primary ml-[5px] ">21,000,000 (100%)</span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
