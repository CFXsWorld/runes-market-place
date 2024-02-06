'use client';

import Tabs from '@/app/(pages)/my/_components/Tabs';
import Empty from "@/app/components/Empty";

export default function Order() {
  return (
    <div>
      <Tabs />
      <div className="pt-[24px] flex-center">
          <Empty/>
      </div>
    </div>
  );
}
