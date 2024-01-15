'use client';

import Checkbox from '@/app/components/ui/Checkbox';
import ClaimableList from '@/app/(pages)/my/_components/Attention/claim/ClaimableList';
import { Button } from 'flowbite-react';
import useAssetsList from '@/app/(pages)/wormhole/_components/TokenInput/useAssetsList';
import { cn } from '@/app/utils/classnames';
import { Waypoint } from 'react-waypoint';
import LoadMore from '@/app/components/LoadMore';

const AssetsList = ({ onConfirm, open, getData, isMutating }) => {
  const {
    clearAll,
    selectAll,
    source,
    loadMore,
    noMore,
    selected = [],
    onSelectItem,
  } = useAssetsList({ open, getData });
  return (
    <div className="px-6  pb-6 flex flex-col">
      <div className="flex mt-[12px] justify-end w-full mb-[12px]">
        <Checkbox
          onChange={selectAll}
          className="text-tc-secondary max-md:text-[12px] max-md:mr-[16px]"
        >
          Select All
        </Checkbox>
      </div>
      <div className="h-[400px] overflow-y-auto mt-[10px]">
        <div className="grid w-full gap-[10px] grid-cols-3 max-sm:grid-cols-2">
          {(source || []).map((item) => (
            <div
              key={item.id}
              className={cn(
                'min-w-[85px] max-w-[120px] flex flex-col cursor-pointer overflow-hidden',
                'bg-fill-secondary h-[68px] border-[2px] border-fill-e-primary p-[12px]',
                'rounded-[8px]',
                {
                  'border-theme': selected.find(
                    (record) => record.id === item.id
                  ),
                }
              )}
              onClick={() => {
                onSelect(item);
              }}
            >
              <div className="text-theme text-[14px]">CFXs</div>
              <div className="text-tc-secondary text-[12px] mt-[5px]">
                #{item.id}
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
      <div className="flex-center-between pt-[12px]">
        <div className="flex-center">
          <span className="text-tc-secondary max-md:text-[12px] w-[80px]">
            {selected.length} Item
          </span>
          <span className="text-theme cursor-pointer" onClick={clearAll}>
            Clear
          </span>
        </div>
        <Button
          color="primary"
          disabled={!selected.length}
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
