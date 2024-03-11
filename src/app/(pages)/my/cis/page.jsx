'use client';

import MyCISList from '@/app/(pages)/my/_components/MyCISList';
import Tabs from '@/app/(pages)/my/_components/Tabs';


export default function MyCIS() {
  return (
    <div>
      <Tabs />
      <div className="mt-[24px]">
        <div className="mt-[12px] mb-[24px]">
          <div className="flex items-center justify-between text-[16px] max-md:text-[12px] font-[500] text-tc-secondary">

          </div>
        </div>
        <p>The CFXs Identification Service</p>
        <MyCISList type={-1} />
      </div>
    </div>
  );
}
