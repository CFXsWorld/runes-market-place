import Card from '@/app/(pages)/my/_components/MyOrderList/Card';
import { Waypoint } from 'react-waypoint';
import LoadMore from '@/app/components/LoadMore';
import useMyRecordsList from '@/app/(pages)/inscribe/_components/Records/useRecord';

const Records = () => {
  const { source, refreshing, loadMore, isMutating, noMore, refresh } =
    useMyRecordsList();
  return (
    <div>
      <p className="text-white text-[18px] mb-[20px] font-bold">Records</p>
      <p className="text-tc-secondary">
        You need to register after submitting an inscription of your CFXs or the
        content can not be displayed on the market.
      </p>
      <div className="w-full pt-[32px] pb-[96px]">
        <div id="market-sentinel" className="w-full" />
        <div className="grid w-full gap-[24px] max-md:gap-[8px]">
          {(source || []).map((item) => (
            <div key={item.id} className='w-full'></div>
          ))}
        </div>
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

export default Records;
