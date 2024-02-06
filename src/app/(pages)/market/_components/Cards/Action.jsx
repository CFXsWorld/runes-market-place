'use client';

import { LoadingIcon, UsdtIcon } from '@/app/components/icons';
import { Button } from 'flowbite-react';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { addressFormat } from "@/app/utils";

const Action = ({ item, onBuy }) => {
  const { trigger, loading } = usePromiseLoading(onBuy);
  return (
    <div className="flex-1 bg-fill-e-primary p-[16px] max-sm:p-[10px] flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex-center">
          <span className="text-tc-secondary text-[12px]">#{item.id}</span>
        </div>
        <span className="text-[14px] font-medium flex-center">
          <UsdtIcon className="text-[16px] mr-[4px] max-sm:text-[12px]" />
          {parseFloat(item.amount).toFixed(3)}
        </span>
      </div>
      <div className="flex items-center justify-between mt-[15px] max-sm:mt-[8px]">
        <span className="text-tc-secondary text-[12px]">
          {addressFormat(item.chainto)}
        </span>
        <Button
          color="outline"
          className="max-sm:text-[12px] btn btn-outline btn-primary max-sm:h-[26px] max-sm:min-h-[26px] h-[30px] min-h-[30px] text-[12px] font-normal line-clamp-1 ml-[3px]"
          disabled={loading}
          onClick={(e) => {
            e.stopPropagation();
            trigger(item);
          }}
        >
          {loading ? (
            <LoadingIcon />
          ) : (
            <span className="line-clamp-1">
              Buy <span className="max-md:hidden">Now</span>
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Action
