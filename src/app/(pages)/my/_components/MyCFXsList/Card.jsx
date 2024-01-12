'use client';

import { cn } from '@/app/utils/classnames';
import { MergeIcon, FragmentIcon, SplitIcon } from '@/app/components/icons';

const CFXsCard = ({ item, selected, onSelect, onBuy }) => {
  const isMerge = item.amount > 1;
  return (
    <div
      className={cn(
        'min-w-[200px] max-w-[300px]  max-sm:min-w-[160px]  max-sm:max-w-full flex flex-col cursor-pointer overflow-hidden',
        'bg-fill-secondary h-[165px] max-sm:h-[150px] border-[2px] border-fill-e-secondary',
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
              {!isMerge ? <FragmentIcon /> : <MergeIcon />}
            </span>
            <span className="max-sm:text-[12px]">CFXs</span>
          </div>
          <span className="text-tc-secondary">#{item.id}</span>
        </div>
        <div className="my-[16px] flex flex-col justify-center items-center max-sm:my-[12px]">
          <span className="text-[24px] font-[500]">{item.amount}</span>
        </div>
        <div className="flex-center">
          {isMerge && (
            <div className="w-[36px] h-[36px] border border-theme rounded-[4px] flex-center mr-[12px]">
              <SplitIcon />
            </div>
          )}
          <button
            className="btn btn-outline btn-primary h-[36px] min-h-[36px] px-[8px] text-[14px] font-normal rounded-[4px] flex-1"
            onClick={(e) => {
              e.stopPropagation()
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
