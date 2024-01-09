'use client';

import MyOrderList from '@/app/(pages)/my/_components/MyOrderList';
import { RefreshIcon } from '@/app/components/icons';
import Selector from '@/app/components/ui/Selector';
import Search from '@/app/components/ui/Input/Search';

export default function Order() {
  return (
    <div className="pt-[24px]">
      <div className="text-tc-secondary flex items-center justify-between">
        <div className="flex-center">
          <span>Balance: 1538</span>
          <RefreshIcon className="mx-[16px] cursor-pointer hover:opacity-80" />
        </div>
        <button className="btn btn-primary h-[36px] min-h-[36px] rounded-[4px]">
          CANCEL ALL LISTINGS
        </button>
      </div>
      <MyOrderList />
    </div>
  );
}
