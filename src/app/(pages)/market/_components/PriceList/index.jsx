'use client';

import { cn } from '@/app/utils/classnames';
import usePriceList from '@/app/(pages)/market/_components/PriceList/usePriceList';

const PriceList = ({ data = {} }) => {
  const { count, isPC, items, style } = usePriceList();
  return (
    <div className="w-full">
      <div id="price-list-sentinel" className="w-full md:hidden" />
      <div
        className="flex items-center justify-around mt-[24px] max-md:flex-wrap max-md:justify-start"
        style={style}
      >
        {(count > 1 || isPC) &&
          items.map((item) => (
            <div
              key={item.name}
              className={cn(
                'flex flex-col items-start',
                'max-md:bg-fill-secondary max-md:min-w-[100px] max-md:max-w-[140px] max-md:h-[60px] ',
                'max-md:p-[8px] max-md:rounded-[4px]'
              )}
            >
              <span className="text-tc-secondary mb-[8px]  max-md:text-[12px] max-md:mb-[4px]">
                {item.label}
              </span>
              <span className="text-[20px] font-bold max-md:text-[16px]">
                {data[item.name]
                  ? `${item.symbol} ${item.format(data[item.name])}`
                  : '--'}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PriceList;
