'use client';

import { cn } from '@/app/utils/classnames';
import { MergeIcon, FragmentIcon, SplitIcon } from '@/app/components/icons';

const CFXsCard = ({ item, selected, onSelect, onBuy }) => {
  return (
    <div
      className={cn(
        'min-w-[200px] max-w-[300px] flex flex-col cursor-pointer overflow-hidden',
        'bg-fill-secondary h-[165px] border-[2px] border-fill-e-secondary',
        'rounded-[8px]',
        { 'border-theme': selected.includes(item.id) }
      )}
      onClick={() => {
        onSelect(item.id);
      }}
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
        </div>
        <div className="flex-center">
          <div className="w-[36px] h-[36px] border border-theme rounded-[4px] flex-center mr-[12px]">
            <SplitIcon />
          </div>
          <button
            className="btn btn-outline btn-primary h-[36px] min-h-[36px] px-[8px] text-[14px] font-normal rounded-[4px] flex-1"
            onClick={() => {
              onBuy(item);
            }}
          >
            List for sale
          </button>
        </div>
      </div>
    </div>
  );
};

export default CFXsCard;
