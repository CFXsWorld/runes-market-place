'use client';

import { LoadingIcon } from '@/app/components/icons';
import Empty from '@/app/components/Empty';

export default function LoadMore({ loading, data, refresh }) {
  if (loading) {
    return (
      <div className="w-full h-[60px] flex-center">
        <LoadingIcon className="text-[20px]" />
        <span className="text-[14px] text-tc-secondary pl-[12px]">
          Loading...
        </span>
      </div>
    );
  }
  if (data && data.length === 0 && !loading) {
    return <Empty />;
  }

  return (
    <div
      className="h-[60px] flex-center text-theme cursor-pointer"
      onClick={refresh}
    >
      Load more
    </div>
  );
}
