'use client';

import { SplitIcon } from '@/app/components/icons';
import { Button } from 'flowbite-react';

const Action = ({ item, onListing, onSplit }) => {
  const isMerge = item.amount > 1;
  return (
    <div className="flex-center">
      {isMerge && (
        <div
          className="w-[36px] h-[36px] border border-theme rounded-[4px] flex-center mr-[12px] text-theme hover:bg-theme hover:text-black"
          onClick={(e) => {
            e.stopPropagation();
            onSplit(item);
          }}
        >
          <SplitIcon />
        </div>
      )}
      <Button
        color="outline"
        className="h-[36px] min-h-[36px] px-[8px] text-[14px] font-normal rounded-[4px] flex-1"
        onClick={(e) => {
          e.stopPropagation();
          onListing(item);
        }}
      >
        <span className="max-sm:text-[12px] line-clamp-1">List for sale</span>
      </Button>
    </div>
  );
};

export default Action;
