'use client';

import CFXsInfo from './_components/CFXsInfo';
import PriceList from './_components/PriceList';
import Filter from './_components/Filter';
import CFXsList from '@/app/(pages)/market/_components/CFXsList';

export default function Market() {

  return (
    <div className="pt-[24px] w-full">
      <CFXsInfo />
      <PriceList />
      <Filter />
      <CFXsList />
    </div>
  );
}
