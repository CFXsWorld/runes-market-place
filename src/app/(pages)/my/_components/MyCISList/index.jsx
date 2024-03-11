'use client';

import { Waypoint } from 'react-waypoint';
import useList from './useList';
import LoadMore from '@/app/components/LoadMore';
import ResolveModal from './resolve/ResolveModal';
import SetNameModal from './setName/SetNameModal';
import CFXsMyCard from './Card';

export default function MyCFXsList({ type }) {
  const {
    loadMore,
    refresh,
    isMutating,
    count,
    source,
    noMore,
    account,
    refreshing,
    handleSetName,
    handleResolve,
    resolveOpen,
    setNameOpen,
    nameOpen,
    setResolveOpen,
    item,
  } = useList(type);

  return (
    account && (
      <div>
        <ResolveModal
          open={resolveOpen}
          onOpen={setResolveOpen}
          item={item}
          reload={refresh}
          key={`ResolveModal${item?.id}`}
        />
        <SetNameModal
          key={`SetNameModal${item?.id}`}
          open={nameOpen}
          onOpen={setNameOpen}
          item={item}
          reload={refresh}
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
                  onResolve={handleResolve}
                  onSetName={handleSetName}
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
        </div>
      </div>
    )
  );
}
