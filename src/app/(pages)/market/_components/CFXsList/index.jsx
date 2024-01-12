'use client';

import Card from './Card';
import { Waypoint } from 'react-waypoint';
import useList from './useList';
import MultiHandleBar from '@/app/(pages)/market/_components/CFXsList/MultiHandleBar';
import LoadMore from '@/app/components/LoadMore';
import Filter from '@/app/(pages)/market/_components/Filter';
import ApproveModal from '@/app/(pages)/market/_components/CFXsList/ApproveModal';
import PurchaseModal from '@/app/(pages)/market/_components/CFXsList/PurchaseModal';
import usePurchase from '@/app/(pages)/market/_components/CFXsList/usePurchase';
import purchaseModal from '@/app/(pages)/market/_components/CFXsList/PurchaseModal';

export default function CFXsList() {
  const {
    source,
    isMutating,
    loadMore,
    count,
    selected,
    clearAll,
    onSelect,
    totalResult,
    refresh,
    filter,
    setFilter,
    selectAll,
    noMore,
  } = useList();

  const {
    purchaseOrder,
    handleApprove,
    handlePurchase,
    onBuy,
    getUSDTBalance,
    handleMultiPurchase,
    approveOpen,
    onApproveOpen,
    purchaseOpen,
    onPurchaseOpen,
  } = usePurchase({ selected, clearAll, refresh });

  return (
    <div>
      <Filter
        total={totalResult}
        reload={refresh}
        filter={filter}
        setFilter={setFilter}
      />
      <div className="w-full pt-[32px] pb-[96px]">
        <div id="market-sentinel" className="w-full" />
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
              onBuy={handlePurchase}
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
          handleMultiPurchase={handleMultiPurchase}
        />
      </div>
      <ApproveModal
        open={approveOpen}
        onOpen={onApproveOpen}
        purchaseOrder={purchaseOrder}
        handleApprove={handleApprove}
      />
      <PurchaseModal
        open={purchaseOpen}
        onOpen={onPurchaseOpen}
        purchaseOrder={purchaseOrder}
        getUSDTBalance={getUSDTBalance}
        onBuy={onBuy}
      />
    </div>
  );
}
