'use client';

import Card from './Card';
import { Waypoint } from 'react-waypoint';
import useList from './useList';
import MultiHandleBar from './MultiHandleBar';
import LoadMore from '@/app/components/LoadMore';
import Filter from '@/app/(pages)/my/_components/Filter';

export default function MyCFXsList() {
  const {
    source,
    isMutating,
    loadMore,
    count,
    selected,
    clearAll,
    onSelect,
    onBuy,
    noMore,
    refresh,
  } = useList();

  return (
    <div>
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
              onBuy={onBuy}
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
        <MultiHandleBar selected={selected} clearAll={clearAll} />
      </div>
    </div>
  );
}
