'use client';

import { cn } from '@/app/utils/classnames';
import Card from './Card';
import { Waypoint } from 'react-waypoint';
import useList from './useList';
import LoadMore from '@/app/components/LoadMore';

export default function MyOrderList() {
  const { dataSource, loadMore, count, selected, clearAll, onSelect, onBuy } =
    useList();

  return (
    <div className="w-full pt-[32px] pb-[96px]">
      <div id="market-sentinel" className="w-full" />
      <div
        className="grid w-full gap-[24px] max-md:gap-[8px]"
        style={{
          gridTemplateColumns: `repeat(${count},1fr)`,
        }}
      >
        {dataSource.map((item) => (
          <Card key={item.id} item={item} onBuy={onBuy} />
        ))}
      </div>
      <Waypoint
        scrollableAncestor={typeof window !== 'undefined' ? window : null}
        onEnter={loadMore}
      >
        <div className='w-full'>
          <LoadMore loading={true} />
        </div>
      </Waypoint>
    </div>
  );
}
