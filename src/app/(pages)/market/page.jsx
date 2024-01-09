'use client';

import CFXsInfo from './_components/CFXsInfo';
import PriceList from './_components/PriceList';
import Filter from './_components/Filter';
import { ListIcon } from '@/app/components/icons';
import CFXsList from '@/app/(pages)/market/_components/CFXsList';

export default function Market() {

  return (
    <div className="pt-[24px] w-full">
      <CFXsInfo />
      <PriceList />
      <div className="mt-[24px] mb-[18px] text-theme test-[24px] flex items-center">
        <ListIcon />
        <span className="font-bold pl-[12px]">Listings</span>
      </div>
      <Filter />
      <CFXsList />
    </div>
  );
}
