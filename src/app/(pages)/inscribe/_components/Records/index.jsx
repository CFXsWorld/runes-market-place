import { Waypoint } from 'react-waypoint';
import LoadMore from '@/app/components/LoadMore';
import useMyRecordsList from '@/app/(pages)/inscribe/_components/Records/useRecord';
import { Button } from 'flowbite-react';
import CFXsPreview from '@/app/(pages)/inscribe/_components/Records/CFXsPreview';
import { useState } from 'react';

const STATUS = {
  '-2': 'Finalizing',
  1: 'Finalized',
  0: 'Failed',
};

const TYPES = {
  1: 'Image',
  2: 'Audio',
  3: 'Text',
};
const Records = () => {
  const { source, refreshing, loadMore, isMutating, noMore, refresh } =
    useMyRecordsList();
  const [open, onOpen] = useState(false);
  const [item, setItem] = useState(null);
  return (
    <div>
      <p className="text-white text-[18px] mb-[20px] font-bold">Records</p>
      <p className="text-tc-secondary">
        You need to register after submitting an inscription of your CFXs or the
        content can not be displayed on the market.
      </p>
      <CFXsPreview open={open} onOpen={onOpen} item={item} />
      <div className="w-full pt-[32px] pb-[96px]">
        <div className="flex-center bg-fill-secondary py-[10px] px-[10px] rounded-[12px] text-tc-secondary">
          <div className="w-[100px]">Type</div>
          <div className="flex-1">Status</div>
          <div className="w-[100px]">Action</div>
        </div>
        <div className="w-full my-[20px]">
          {(source || []).map((item) => (
            <div
              key={item.id}
              className="w-full flex-center py-[8px] px-[10px] text-[14px]"
            >
              <div className="w-[100px] text-theme">
                <span
                  className="border border-transparent border-b-theme cursor-pointer"
                  onClick={() => {
                    setItem(item);
                    onOpen(true)
                  }}
                >
                  {TYPES[item.regmarket] || 'UNKNOWN'}
                </span>
              </div>
              <div className="flex-1">
                {STATUS[item.allowed] || 'Finalizing'}
              </div>
              <div className="w-[100px]">
                <Button
                  color="outline"
                  className="max-sm:text-[12px] btn btn-outline btn-primary max-sm:h-[26px] max-sm:min-h-[26px] h-[30px] min-h-[30px] text-[12px] font-normal line-clamp-1 ml-[3px] w-full"
                  disabled
                >
                  Register
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="grid w-full gap-[24px] max-md:gap-[8px]"></div>
        <Waypoint
          key={refreshing}
          scrollableAncestor={typeof window !== 'undefined' ? window : null}
          onEnter={() => {
            loadMore();
          }}
        >
          <div className="w-full">
            <LoadMore
              loading={isMutating}
              data={source}
              noMore={noMore}
              refresh={refresh}
            />
          </div>
        </Waypoint>
      </div>
    </div>
  );
};

export default Records;
