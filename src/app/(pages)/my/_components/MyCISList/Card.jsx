'use client';

import { cn } from '@/app/utils/classnames';
import { GoldenLogoIcon } from '@/app/components/icons';
import { Button } from 'flowbite-react';

const CFXsMyCard = ({ item, onResolve, onSetName }) => {
  return (
    <div
      className={cn(
        'h-[175px] max-sm:h-[160px] min-w-[254px] max-w-[350px]  max-sm:min-w-[160px]  max-sm:max-w-full flex flex-col cursor-pointer overflow-hidden',
        'bg-fill-secondary  border-[2px] border-fill-e-secondary',
        'rounded-[8px]'
      )}
    >
      <div className="p-[16px] max-sm:p-[10px]">
        <div className="flex flex-col items-center gap-[10px]">
          <GoldenLogoIcon />
          <span className="text-white">CIS: {item.id}</span>
        </div>
      </div>
      <div className="flex-center gap-[10px]">
        <Button
          color="outline"
          className="h-[36px] min-h-[36px] px-[0px] text-[14px] font-normal rounded-[4px]"
          onClick={(e) => {
            e.stopPropagation();
            onResolve(item);
          }}
        >
          <span className="max-sm:text-[12px] line-clamp-1">
            Resolve Address
          </span>
        </Button>

        <Button
          color="outline"
          className="h-[36px] min-h-[36px] px-[8px] text-[14px] font-normal rounded-[4px]"
          onClick={(e) => {
            e.stopPropagation();
            onSetName(item);
          }}
        >
          <span className="max-sm:text-[12px] line-clamp-1">Set Name</span>
        </Button>
      </div>
    </div>
  );
};

export default CFXsMyCard;
