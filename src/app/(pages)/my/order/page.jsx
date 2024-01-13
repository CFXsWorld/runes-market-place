'use client';

import MyOrderList from '@/app/(pages)/my/_components/MyOrderList';
import { RefreshIcon } from '@/app/components/icons';
import Selector from '@/app/components/ui/Selector';
import Search from '@/app/components/ui/Input/Search';

export default function Order() {
  return (
    <div className="pt-[24px]">
      <MyOrderList />
    </div>
  );
}
