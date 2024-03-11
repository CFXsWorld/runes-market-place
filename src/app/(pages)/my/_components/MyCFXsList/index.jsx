'use client';

import { Waypoint } from 'react-waypoint';
import useList from './useList';
import MultiHandleBar from './MultiHandleBar';
import LoadMore from '@/app/components/LoadMore';
import Filter from './Filter';
import ListingModal from '@/app/(pages)/my/_components/MyCFXsList/listing/ListingModal';
import MergeModal from '@/app/(pages)/my/_components/MyCFXsList/merge/MergeModal';
import TransferModal from '@/app/(pages)/my/_components/MyCFXsList/transfer/TransferModal';
import BatchListingModal from '@/app/(pages)/my/_components/MyCFXsList/listing/BatchListingModal';
import SplitModal from '@/app/(pages)/my/_components/MyCFXsList/split/SplitModal';
import CFXsMyCard from "@/app/(pages)/my/_components/Cards";

export default function MyCFXsList({ type }) {
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
    account,
    checkAll,
    filter,
    setFilter,
    totalResult,
    refreshing,
  } = useList(type);

  return (
    account && (
      <div>
        <ListingModal
          open={openListing}
          onOpen={onOpenListing}
          key={listingOrder?.id}
          listingOrder={listingOrder}
          reload={refresh}
        />
        <MergeModal
          key={`MergeModal${openMerge}`}
          open={openMerge}
          onOpen={onOpenMerge}
          selected={selected}
          reload={refresh}
        />
        <TransferModal
          key={`TransferModal${openTransfer}`}
          open={openTransfer}
          onOpen={onOpenTransfer}
          selected={selected}
          reload={refresh}
        />
        <BatchListingModal
          key={`BatchListingModal${openBatchListing}`}
          open={openBatchListing}
          onOpen={onOpenBatchListing}
          selected={selected}
          reload={refresh}
        />

        <SplitModal
          key={`SplitModal${openSplit}`}
          open={openSplit}
          onOpen={onOpenSplit}
          splitOrder={splitOrder}
          reload={refresh}
        />

        <Filter
          total={totalResult}
          reload={refresh}
          filter={filter}
          setFilter={setFilter}
        />
        <div className="w-full pt-[32px] pb-[96px] max-sm:pb-[180px]">
          <div id="my-cfxs-sentinel" className="w-full" />
          <div
            className="grid w-full gap-[24px] max-md:gap-[8px]"
            style={{
              gridTemplateColumns: `repeat(${count},1fr)`,
            }}
          >
            {(source || []).map((item) => {
              return (
                <CFXsMyCard
                  key={item.id}
                  item={item}
                  onSelect={onSelect}
                  selected={selected}
                  onListing={handleListing}
                  onSplit={handleSplit}
                />
              );
            })}
          </div>

          <Waypoint
            key={refreshing}
            scrollableAncestor={typeof window !== 'undefined' ? window : null}
            onEnter={() => {
              loadMore();
            }}
          >
            <div className="w-full">
              <LoadMore loading={isMutating} data={source} noMore={noMore} />
            </div>
          </Waypoint>

          <MultiHandleBar
            selected={selected}
            clearAll={clearAll}
            selectAll={selectAll}
            checkAll={checkAll}
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
    )
  );
}
