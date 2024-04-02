import CFXsPreview from '@/app/(pages)/inscribe/_components/Records/CFXsPreview';
import { Button } from 'flowbite-react';
import { Waypoint } from 'react-waypoint';
import LoadMore from '@/app/components/LoadMore';
import useApplyInscribe from '@/app/(pages)/inscribe/_components/Records/useApplyInscribe';
import { useState } from 'react';
import { addressFormat } from '@/app/utils';
import { CopyIcon } from '@/app/components/icons';
import { useCopy } from '@/app/hooks/useCopy';

const STATUS = {
  '-2': 'None',
  0: 'Finalizing',
  1: 'Finalized',
  2: 'Failed',
};

const TYPES = {
  1: 'Image',
  2: 'Audio',
  3: 'Text',
};

const AdminApplyList = () => {
  const { source, refreshing, loadMore, isMutating, noMore, refresh, apply } =
    useApplyInscribe();
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
              className="max-sm:text-[12px] btn btn-outline btn-primary max-sm:h-[26px] max-sm:min-h-[26px] h-[20px] min-h-[20px] text-[12px] font-normal line-clamp-1 ml-[3px] w-full"
              onClick={() => {
                apply(item, 2);
              }}
            >
              Fail
            </Button>
            <Button
              color="outline"
              className="max-sm:text-[12px] btn btn-outline btn-primary max-sm:h-[26px] max-sm:min-h-[26px] h-[20px] min-h-[20px] text-[12px] font-normal line-clamp-1 ml-[3px] w-full"
              onClick={() => {
                apply(item, 1);
              }}
            >
              Confirm
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
      <div className="w-full pt-[32px] pb-[96px] ">
        {/*<div className=" max-sm:hidden  flex-center bg-fill-secondary py-[10px] px-[10px] rounded-[12px] text-tc-secondary text-[14px] max-sm:text-[12px]">*/}
        {/*  <div className="w-[40px]">Type</div>*/}
        {/*  <div className="flex-1 min-w-[50px]">Status</div>*/}
        {/*  <div className="w-[70px]">ID</div>*/}
        {/*  <div className="w-[80px]">Address</div>*/}
        {/*  <div className="w-[100px]">Action</div>*/}
        {/*</div>*/}
        {/*<div className="max-sm:hidden w-full my-[20px]">*/}
        {/*  {(source || []).map((item) => (*/}
        {/*    <div*/}
        {/*      key={item.id}*/}
        {/*      className="w-full flex-center py-[8px] px-[10px] text-[14px] max-sm:text-[12px]"*/}
        {/*    >*/}
        {/*      <div className="w-[40px] text-theme ">*/}
        {/*        <span*/}
        {/*          className="border border-transparent border-b-theme cursor-pointer"*/}
        {/*          onClick={() => {*/}
        {/*            setItem(item);*/}
        {/*            onOpen(true);*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          {TYPES[item.regmarket] || 'UNKNOWN'}*/}
        {/*        </span>*/}
        {/*      </div>*/}
        {/*      <div className="flex-1 min-w-[50px]">*/}
        {/*        {STATUS[item.allowed] || 'Finalizing'}*/}
        {/*      </div>*/}
        {/*      <div className="w-[70px]">ID</div>*/}
        {/*      <div className="w-[80px]">Address</div>*/}
        {/*      <div className="w-[180px] flex items-center gap-[10px]">*/}
        {/*        <Button*/}
        {/*          color="outline"*/}
        {/*          className="max-sm:text-[12px] btn btn-outline btn-primary max-sm:h-[26px] max-sm:min-h-[26px] h-[30px] min-h-[30px] text-[12px] font-normal line-clamp-1 ml-[3px] w-full"*/}
        {/*          onClick={() => {*/}
        {/*            apply(item, 2);*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          Fail*/}
        {/*        </Button>*/}
        {/*        <Button*/}
        {/*          color="outline"*/}
        {/*          className="max-sm:text-[12px] btn btn-outline btn-primary max-sm:h-[26px] max-sm:min-h-[26px] h-[30px] min-h-[30px] text-[12px] font-normal line-clamp-1 ml-[3px] w-full"*/}
        {/*          onClick={() => {*/}
        {/*            apply(item, 1);*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          Confirm*/}
        {/*        </Button>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>*/}

        <div className="">
          {(source || []).map((item) => (
            <div key={item.id}>{renderMD(item)}</div>
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

export default AdminApplyList;
