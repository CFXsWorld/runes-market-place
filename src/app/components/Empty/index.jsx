'use client';

import { EmptyIcon } from '@/app/components/icons';

export default function Empty() {
  return (
    <div className="flex flex-col items-center justify-center">
      <EmptyIcon />
      <span className="text-tc-secondary mt-[8]">No Data</span>
    </div>
  );
}
