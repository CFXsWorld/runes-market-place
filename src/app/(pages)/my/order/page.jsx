'use client';

import MyOrderList from '@/app/(pages)/my/_components/MyOrderList';
import Tabs from '@/app/(pages)/my/_components/Tabs';

export default function Order() {
  return (
    <div>
      <Tabs />
      <div className="pt-[24px]">
        <MyOrderList />
      </div>
    </div>
  );
}
