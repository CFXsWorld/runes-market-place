'use client';

import { cn } from '@/app/utils/classnames';
import {
  MergeIcon,
  FragmentIcon,
  TimeIcon,
  UsdtIcon,
} from '@/app/components/icons';
import { addressFormat } from '@/app/utils';
import dayjs from 'dayjs';

const CFXsCard = ({ item, selected, onSelect, onBuy }) => {
  return (
    <div
      className={cn(
        'min-w-[200px] max-w-[300px]  max-sm:min-w-[160px]  max-sm:max-w-full flex flex-col cursor-pointer overflow-hidden',
        'bg-fill-secondary h-[276px] max-sm:h-[224px] border-[2px] border-fill-e-secondary',
        'rounded-[8px]',
        { 'border-theme': selected.includes(item.id) }
      )}
      onClick={() => {
        onSelect(item.id);
      }}
    >
      <div className="p-[16px] max-sm:p-[10px]">
        <div className="flex-center-between">
          <div className="text-theme flex items-center">
            <span className="text-[24px] mr-[8px] max-sm:text-[14px]">
              {item.quantity === '1' ? <FragmentIcon /> : <MergeIcon />}
            </span>
            <span className="max-sm:text-[12px]">CFXs</span>
          </div>
          <span className="text-tc-secondary max-sm:text-[12px]">
            #{item.id}
          </span>
        </div>
        <div className="my-[16px] flex flex-col justify-center items-center max-sm:my-[12px]">
          <span className="text-[24px] font-[500]">{item.quantity}</span>
          <div className="mt-[4px] text-[14px] text-tc-secondary">
            <span className="text-theme">
              ${Number(item.unitprice).toFixed(4)}
            </span>
            <span className="px-[4px]">/</span>
            <span>CFXs</span>
          </div>
        </div>
        <div className="inline-block text-tc-secondary bg-fill-e-secondary w-auto p-[4px] rounded-[2px]">
          <div className="flex-center">
            <TimeIcon className="text-[12px] mr-[4px]" />
            <span className="text-[12px]">
              Expired:{' '}
              {item.locktime
                ? dayjs.unix(item.locktime).format('MM-DD HH:mm')
                : '-'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-fill-e-primary p-[16px] max-sm:p-[10px]">
        <div className="flex items-center justify-between">
          <div className="flex-center">
            <UsdtIcon className="text-[16px] mr-[4px] max-sm:text-[12px]" />
            <span className="text-[12px]">USDT</span>
          </div>
          <span className="text-[16px] font-medium">${item.amount}</span>
        </div>
        <div className="flex items-center justify-between mt-[15px] max-sm:mt-[8px]">
          <span className="text-tc-secondary text-[12px]">
            {addressFormat(item.chainto)}
          </span>
          <button
            className="max-sm:text-[12px] btn btn-outline btn-primary max-sm:h-[26px] max-sm:min-h-[26px] h-[30px] min-h-[30px] px-[8px] text-[14px] font-normal"
            onClick={() => {
              onBuy(item);
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CFXsCard;
