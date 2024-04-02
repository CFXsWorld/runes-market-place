import CFXsPreview from "@/app/(pages)/inscribe/_components/Records/CFXsPreview";
import { Button } from "flowbite-react";
import { Waypoint } from "react-waypoint";
import LoadMore from "@/app/components/LoadMore";
import useMyRecordsList from "@/app/(pages)/inscribe/_components/Records/useRecord";
import { useState } from "react";
import { useCopy } from "@/app/hooks/useCopy";
import { addressFormat } from "@/app/utils";
import { CopyIcon } from "@/app/components/icons";

const STATUS = {
  '-2': 'Finalizing',
  1: 'Finalized',
  2: 'Failed',
};

const TYPES = {
  1: 'Image',
  2: 'Audio',
  3: 'Text',
};
const MyRecordsList = () => {
  const { source, refreshing, loadMore, isMutating, noMore, refresh } =
    useMyRecordsList();
  const [open, onOpen] = useState(false);
  const [item, setItem] = useState(null);


  const { copy } = useCopy();
  const renderMD = (item) => {
    return (
      <div className="bg-fill-secondary py-[10px] px-[10px] rounded-[12px] text-tc-secondary text-[14px] min-h-[80px]">
        <div className="flex-center-between">
          <span>#{item.id}</span>
          <div className="min-w-[50px] text-white">
            {STATUS[item.allowed] || 'None'}
          </div>
        </div>
        <div className="flex-center-between mt-[10px]">
          <div className='flex-center' >
            <div className="flex items-center gap-[10px] w-[65px]">
              <span
                className=" text-theme  border border-transparent border-b-theme cursor-pointer"
                onClick={() => {
                  setItem(item);
                  onOpen(true);
                }}
              >
              {TYPES[item.regmarket] || 'UNKNOWN'}
            </span>
            </div>
            <div className="w-[80px] ml-[20px] flex items-center">
              {addressFormat(item.owner || '')}
              <CopyIcon
                className="text-tc-secondary hover:text-theme  cursor-pointer ml-[10px]"
                onClick={() => {
                  copy(item.owner);
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-[5px]">
            <Button
              color="outline"
              className="max-sm:text-[12px] btn btn-outline btn-primary max-sm:h-[26px] max-sm:min-h-[26px] h-[30px] min-h-[30px] text-[12px] font-normal line-clamp-1 ml-[3px] w-full"
              disabled
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <p className="text-tc-secondary">
        You need to register after submitting an inscription of your CFXs or the
        content can not be displayed on the market.
      </p>
      <CFXsPreview open={open} onOpen={onOpen} item={item} />
      <div className="w-full pt-[32px] pb-[96px]">
        {/*<div className="flex-center bg-fill-secondary py-[10px] px-[10px] rounded-[12px] text-tc-secondary">*/}
        {/*  <div className="w-[100px]">Type</div>*/}
        {/*  <div className="flex-1">Status</div>*/}
        {/*  <div className="w-[100px]">Action</div>*/}
        {/*</div>*/}
        <div className="w-full my-[20px]">
          <div className="flex-col gap-[20px]">
            {(source || []).map((item) => (
              <div key={item.id} className='mb-[20px]'>{renderMD(item)}</div>
            ))}
          </div>
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

export default MyRecordsList;
