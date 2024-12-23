'use client';

import { cn } from '@/app/utils/classnames';

const Tabs = ({ tabs = [], onActiveTabChange, value, extra }) => {
  return (
    <div className="flex items-center justify-between text-[18px] max-md:text-[12px] font-[500] text-tc-secondary">
      <div className='flex items-center'>
        {tabs.map((tab) => (
          <div
            key={tab.value}
            onClick={() => {
              onActiveTabChange(tab);
            }}
            className={cn(
              'border-[2px] border-transparent mr-[32px] max-md:mr-[10px] py-[6px] h-[48px] max-md:h-[38px] cursor-pointer',
              {
                'text-theme  border-b-theme': tab.value === value,
              }
            )}
          >
            {tab.name}
          </div>
        ))}
      </div>
      {extra && <div>{extra}</div>}
    </div>
  );
};

export default Tabs;
