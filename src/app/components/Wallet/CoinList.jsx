'use client';

import { CoinTokenIcon } from '@/app/components/icons';
import { formatNumberWithCommas } from '@/app/utils';

export default function CoinList() {
  return (
    <div className="flex-center-between">
      <div className="flex-center">
        <CoinTokenIcon className="text-[40px]" />
      </div>
      <span>{formatNumberWithCommas(0)}</span>
    </div>
  );
}
