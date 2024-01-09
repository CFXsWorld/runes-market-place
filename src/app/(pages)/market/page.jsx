'use client';

import CFXsInfo from './_components/CFXsInfo';
import PriceList from './_components/PriceList';
import Filter from './_components/Filter';
import { ListIcon } from '@/app/components/icons';

export default function Home() {
  return (
    <div className="pt-[40px]">
      <CFXsInfo />
      <PriceList />
      <div className="mt-[24px] mb-[18px] text-theme test-[24px] flex items-center">
        <ListIcon />
        <span className="font-bold pl-[12px]">Listings</span>
      </div>
      <Filter />
      {/*<Marketspace />*/}
    </div>
  );
}
