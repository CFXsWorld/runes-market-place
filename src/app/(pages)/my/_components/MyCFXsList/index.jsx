'use client';

import Card from './Card';
import { Waypoint } from 'react-waypoint';
import useList from './useList';
import MultiHandleBar from './MultiHandleBar';
import LoadMore from '@/app/components/LoadMore';
import Filter from '@/app/(pages)/my/_components/Filter';
import ListingModal from '@/app/(pages)/my/_components/MyCFXsList/listing/ListingModal';
import MergeModal from '@/app/(pages)/my/_components/MyCFXsList/merge/MergeModal';
import TransferModal from '@/app/(pages)/my/_components/MyCFXsList/transfer/TransferModal';
import BatchListingModal from '@/app/(pages)/my/_components/MyCFXsList/listing/BatchListingModal';
import SplitModal from '@/app/(pages)/my/_components/MyCFXsList/split/SplitModal';

export default function MyCFXsList() {
  const {
    source,
    isMutating,
    loadMore,
    count,
    selected,
    clearAll,
    onSelect,
    handleListing,
    noMore,
    refresh,
    openListing,
    openMerge,
    openSplit,
    openTransfer,
    onOpenListing,
    onOpenMerge,
    onOpenSplit,
    onOpenTransfer,
    openBatchListing,
    onOpenBatchListing,
    listingOrder,
    selectAll,
    handleSplit,
    splitOrder,
  } = useList();

  return (
    <div>
      <ListingModal
        open={openListing}
        onOpen={onOpenListing}
        key={listingOrder?.id}
        listingOrder={listingOrder}
        reload={refresh}
      />
      <MergeModal
        open={openMerge}
        onOpen={onOpenMerge}
        selected={selected}
        reload={refresh}
      />
      <TransferModal
        open={openTransfer}
        onOpen={onOpenTransfer}
        selected={selected}
        reload={refresh}
      />
      <BatchListingModal
        open={openBatchListing}
        onOpen={onOpenBatchListing}
        selected={selected}
        reload={refresh}
      />

      <SplitModal
        open={openSplit}
        onOpen={onOpenSplit}
        splitOrder={splitOrder}
        reload={refresh}
      />

      <Filter total={source?.length || 0} reload={refresh} />
      <div className="w-full pt-[32px] pb-[96px]">
        <div id="my-cfxs-sentinel" className="w-full" />
        <div
          className="grid w-full gap-[24px] max-md:gap-[8px]"
          style={{
            gridTemplateColumns: `repeat(${count},1fr)`,
          }}
        >
          {(source || []).map((item) => (
            <Card
              key={item.id}
              item={item}
              onSelect={onSelect}
              selected={selected}
              onListing={handleListing}
              onSplit={handleSplit}
            />
          ))}
        </div>
        <Waypoint
          scrollableAncestor={typeof window !== 'undefined' ? window : null}
          onEnter={loadMore}
        >
          <div className="w-full">
            <LoadMore loading={isMutating} data={source} noMore={noMore} />
          </div>
        </Waypoint>
        <MultiHandleBar
          selected={selected}
          clearAll={clearAll}
          selectAll={selectAll}
          onMerge={() => {
            onOpenMerge(true);
          }}
          onTransfer={() => {
            onOpenTransfer(true);
          }}
          onBatchListing={() => {
            onOpenBatchListing(true);
          }}
        />
      </div>
    </div>
  );
}
