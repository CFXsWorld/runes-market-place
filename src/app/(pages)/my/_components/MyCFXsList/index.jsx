'use client';

import Card from './Card';
import { Waypoint } from 'react-waypoint';
import useList from './useList';
import MultiHandleBar from './MultiHandleBar';
import LoadMore from '@/app/components/LoadMore';

export default function MyCFXsList() {
  const { dataSource, loadMore, count, selected, clearAll, onSelect, onBuy } =
    useList();

  return (
    <div className="w-full pt-[32px] pb-[96px]">
      <div id="my-cfxs-sentinel" className="w-full" />
      <div
        className="w-full"
        style={{
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: `repeat(${count},1fr)`,
        }}
      >
        {dataSource.map((item) => (
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
        <div className='w-full'>
          <LoadMore loading={true} />
        </div>
      </Waypoint>
      {selected.length > 0 && (
        <MultiHandleBar selected={selected} clearAll={clearAll} />
      )}
    </div>
  );
}
