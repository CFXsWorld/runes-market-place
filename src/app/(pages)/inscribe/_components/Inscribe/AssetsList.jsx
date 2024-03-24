'use client';

import { Button } from 'flowbite-react';
import useAssetsList from './useAssetsList';
import { cn } from '@/app/utils/classnames';
import { Waypoint } from 'react-waypoint';
import LoadMore from '@/app/components/LoadMore';

const AssetsList = ({ onConfirm, open, getData, isMutating }) => {
  const {
    source,
    loadMore,
    noMore,
    selected = [],
    onSelect,
  } = useAssetsList({ open, getData });
  return (
    <div className="px-6  pb-6 flex flex-col  bg-fill-e-secondary ">
      <div className="h-[400px] overflow-y-auto mt-[10px]">
        <div className="grid w-full gap-[10px] grid-cols-3 max-sm:grid-cols-2">
          {(source || []).map((item) => (
            <div
              key={item.id}
              className={cn(
                'min-w-[85px] max-w-[140px] flex flex-col cursor-pointer overflow-hidden',
                'bg-fill-secondary h-[68px] border-[2px] border-fill-e-primary p-[12px]',
                'rounded-[8px]',
                {
                  'border-theme': selected?.id === item.id,
                }
              )}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(item);
              }}
            >
              <div className="text-theme text-[14px]">#{item.id}</div>
              <div className="text-tc-secondary text-[12px] mt-[5px]">
                {item.amount}
              </div>
            </div>
          ))}
        </div>
        <Waypoint onEnter={loadMore}>
          <div className="w-full">
            <LoadMore loading={isMutating} data={source} noMore={noMore} />
          </div>
        </Waypoint>
      </div>
      <div className="flex-center pt-[12px]">
        <Button
          color="primary"
          disabled={!selected}
          className="w-[120px]"
          onClick={() => {
            onConfirm(selected);
          }}
        >
          CONFIRM
        </Button>
      </div>
    </div>
  );
};

export default AssetsList;
