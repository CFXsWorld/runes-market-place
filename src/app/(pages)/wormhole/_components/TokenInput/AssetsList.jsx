'use client';

import Checkbox from '@/app/components/ui/Checkbox';
import ClaimableList from '@/app/(pages)/my/_components/Attention/claim/ClaimableList';
import { Button } from 'flowbite-react';
import useAssetsList from '@/app/(pages)/wormhole/_components/TokenInput/useAssetsList';

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
        <ClaimableList
          loadMore={loadMore}
          isMutating={isMutating}
          source={source}
          noMore={noMore}
          onSelect={onSelectItem}
          selected={selected}
        />
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
