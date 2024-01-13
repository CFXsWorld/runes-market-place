'use client';

import { Waypoint } from 'react-waypoint';
import LoadMore from '@/app/components/LoadMore';
import { cn } from '@/app/utils/classnames';

const ClaimableList = ({
  loadMore,
  isMutating,
  source,
  noMore,
  onSelect,
  selected,
}) => {
  return (
    <div>
      <div
        className="grid w-full gap-[10px] grid-cols-4 max-sm:grid-cols-3"
        // style={{
        //   gridTemplateColumns: `repeat(4,1fr)`,
        // }}
      >
        {(source || []).map((item) => (
          <div
            key={item.id}
            className={cn(
              'min-w-[85px] max-w-[120px] flex flex-col cursor-pointer overflow-hidden',
              'bg-fill-secondary h-[68px] border-[2px] border-fill-e-primary p-[12px]',
              'rounded-[8px]',
              {
                'border-theme': selected.find(
                  (record) => record.id === item.id
                ),
              }
            )}
            onClick={() => {
              onSelect(item);
            }}
          >
            <div className="text-theme text-[14px]">CFXs</div>
            <div className="text-tc-secondary text-[12px] mt-[5px]">
              #{item.id}
            </div>
          </div>
        ))}
      </div>
      <Waypoint onEnter={loadMore}>
        <div className="w-full">
          <LoadMore loading={isMutating} data={source} noMore={noMore} />
        </div>
      </Waypoint>
    </div>
  );
};

export default ClaimableList;
