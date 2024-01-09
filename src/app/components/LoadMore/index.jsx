'use client';

import { LoadingIcon } from '@/app/components/icons';

export default function LoadMore({ loading }) {
  if (loading) {
    return (
      <div className="w-full h-[60px] flex-center">
        <LoadingIcon className='text-[20px]'/>
        <span className="text-[14px] text-tc-secondary pl-[12px]">
          Loading...
        </span>
      </div>
    );
  }

  return <div className="h-[60px]">Load more</div>;
}
