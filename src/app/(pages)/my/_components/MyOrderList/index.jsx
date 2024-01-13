'use client';

import Card from './Card';
import { Waypoint } from 'react-waypoint';
import useList from './useList';
import LoadMore from '@/app/components/LoadMore';
import { RefreshIcon } from '@/app/components/icons';
import { formatNumberWithCommas } from '@/app/utils';
import { Button } from 'flowbite-react';
import CancelModal from '@/app/(pages)/my/_components/MyOrderList/cancel/CancelModal';

export default function MyOrderList() {
  const {
    loadMore,
    count,
    totalResult,
    account,
    handleCancel,
    isMutating,
    source,
    noMore,
    refresh,
    onOpen,
    open,
    orders,
    handleCancelAll,
  } = useList();

  return (
    account && (
      <div>
        <CancelModal
          open={open}
          onOpen={onOpen}
          orders={orders}
          reload={refresh}
        />
        <div className="text-tc-secondary flex items-center justify-between">
          <div className="flex-center max-md:text-[12px]">
            <span>Listing: {formatNumberWithCommas(totalResult)}</span>
            <RefreshIcon
              className="mx-[16px] cursor-pointer hover:opacity-80"
              onClick={refresh}
            />
          </div>
          {/*<Button*/}
          {/*  color="primary"*/}
          {/*  className="btn btn-primary h-[36px] min-h-[36px] rounded-[4px] max-md:text-12px"*/}
          {/*  onClik={handleCancelAll}*/}
          {/*>*/}
          {/*  CANCEL ALL <span className="max-md:hidden">LISTINGS</span>*/}
          {/*</Button>*/}
        </div>
        <div className="w-full pt-[32px] pb-[96px]">
          <div id="market-sentinel" className="w-full" />
          <div
            className="grid w-full gap-[24px] max-md:gap-[8px]"
            style={{
              gridTemplateColumns: `repeat(${count},1fr)`,
            }}
          >
            {(source || []).map((item) => (
              <Card key={item.id} item={item} onCancel={handleCancel} />
            ))}
          </div>
          <Waypoint
            scrollableAncestor={typeof window !== 'undefined' ? window : null}
            onEnter={loadMore}
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
    )
  );
}
