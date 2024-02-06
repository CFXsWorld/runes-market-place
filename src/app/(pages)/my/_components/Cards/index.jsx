'use client';

import { cn } from '@/app/utils/classnames';
import Content from '@/app/(pages)/my/_components/Cards/Content';
import Action from '@/app/(pages)/my/_components/Cards/Action';

const CFXsMyCard = ({ item, selected, onSelect, onListing, onSplit }) => {
  const isSelected = selected.find((record) => record.id === item.id);
  return (
    <div
      className={cn(
        'min-w-[200px] max-w-[300px]  max-sm:min-w-[160px]  max-sm:max-w-full flex flex-col cursor-pointer overflow-hidden',
        'bg-fill-secondary  border-[2px] border-fill-e-secondary',
        'rounded-[8px]',
        { 'border-theme': isSelected },
        { 'h-[175px] max-sm:h-[160px]': item.regmarket === 0 },
        { 'h-[220px] max-sm:h-[220px]': item.regmarket !== 0 }
      )}
      onClick={() => {
        onSelect(item);
      }}
    >
      <Content item={item} />
      <Action item={item} onListing={onListing} onSplit={onSplit} />
    </div>
  );
};

export default CFXsMyCard;
