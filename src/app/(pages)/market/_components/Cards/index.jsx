'use client';

import { cn } from '@/app/utils/classnames';
import Content from '@/app/(pages)/market/_components/Cards/Content';
import Action from '@/app/(pages)/market/_components/Cards/Action';

const CFXsMarketCard = ({ item, selected, onSelect, onBuy }) => {
  const isSelected = selected.find((record) => record.id === item.id);
  return (
    <div
      className={cn(
        'min-w-[200px] max-w-[300px]  max-sm:min-w-[160px]  max-sm:max-w-full flex flex-col cursor-pointer overflow-hidden',
        'bg-fill-secondary h-[276px] max-sm:h-[244px] border-[2px] border-fill-e-secondary',
        'rounded-[8px]',
        { 'border-theme': isSelected }
      )}
      onClick={() => {
        onSelect(item);
      }}
    >
      <Content item={item} />
      <Action item={item} onBuy={onBuy} />
    </div>
  );
};

export default CFXsMarketCard;
