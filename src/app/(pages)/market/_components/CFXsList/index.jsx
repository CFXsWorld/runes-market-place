'use client';

import Card from './Card';
import { Waypoint } from 'react-waypoint';
import useList from './useList';
import MultiHandleBar from '@/app/(pages)/market/_components/CFXsList/MultiHandleBar';
import LoadMore from '@/app/components/LoadMore';
import Empty from '@/app/components/Empty';
import Filter from '@/app/(pages)/market/_components/Filter';

export default function CFXsList() {
  const {
    dataSource,
    isMutating,
    loadMore,
    count,
    selected,
    clearAll,
    onSelect,
    onBuy,
    totalResult,
    refresh
  } = useList();
  return (
    <div>
      <Filter total={totalResult} reload={refresh}/>
      <div className="w-full pt-[32px] pb-[96px]">
        <div id="market-sentinel" className="w-full" />
        <div
          className="grid w-full gap-[24px] max-md:gap-[8px]"
          style={{
            gridTemplateColumns: `repeat(${count},1fr)`,
          }}
        >
          {dataSource &&
            dataSource.length > 0 &&
            dataSource.map((item) => (
              <Card
                key={item.id}
                item={item}
                onSelect={onSelect}
                selected={selected}
                onBuy={onBuy}
              />
            ))}
          {dataSource && dataSource.length === 0 && <Empty />}
        </div>
        <Waypoint
          scrollableAncestor={typeof window !== 'undefined' ? window : null}
          onEnter={loadMore}
        >
          <div className="w-full">
            <LoadMore loading={isMutating} />
          </div>
        </Waypoint>
        {selected.length > 0 && (
          <MultiHandleBar selected={selected} clearAll={clearAll} />
        )}
      </div>
    </div>
  );
}
