'use client';

import { cn } from '@/app/utils/classnames';
import {
  MergeIcon,
  FragmentIcon,
  TimeIcon,
  UsdtIcon,
} from '@/app/components/icons';
import { addressFormat } from '@/app/utils';

const CFXsCard = ({ item, onBuy }) => {
  return (
    <div
      className={cn(
        'min-w-[200px] max-w-[300px] flex flex-col overflow-hidden',
        'bg-fill-secondary h-[276px] border-[2px] border-fill-e-secondary',
        'rounded-[8px]'
      )}
    >
      <div className="p-[16px]">
        <div className="flex-center-between">
          <div className="text-theme flex items-center">
            <span className="text-[24px] mr-[8px]">
              {item.count > 0 ? <MergeIcon /> : <FragmentIcon />}
            </span>
            <span>{item.symbol}</span>
          </div>
          <span className="text-tc-secondary">#{item.id}</span>
        </div>
        <div className="my-[16px] flex flex-col justify-center items-center">
          <span className="text-[24px] font-[500]">{item.count}</span>
          <div className="mt-[4px] text-[14px] text-tc-secondary">
            <span className="text-theme">${item.unitPrice}</span>
            <span className="px-[4px]">/</span>
            <span>{item.symbol}</span>
          </div>
        </div>
        <div className="inline-block text-tc-secondary bg-fill-e-secondary w-auto p-[4px] rounded-[2px]">
          <div className="flex-center">
            <TimeIcon className="text-[14px] mr-[4px]" />
            <span className="text-[12px]">Expired: {item.expiredDate}</span>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-fill-e-primary p-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex-center">
            <UsdtIcon className="text-[16px] mr-[4px]" />
            <span className="text-[12px]">USDT</span>
          </div>
          <span className="text-[16px] font-medium">${item.totalAmount}</span>
        </div>
        <div className="flex items-center justify-between mt-[15px]">
          <button
            className="btn btn-outline btn-primary h-[30px] min-h-[30px] px-[8px] text-[14px] font-normal flex-1"
            onClick={() => {
              onBuy(item);
            }}
          >
            Cancel listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default CFXsCard;
