'use client';

import { cn } from '@/app/utils/classnames';
import {
  AudioPlayIcon,
  AudioSoundIcon,
  EyeIcon,
  FragmentIcon,
  LoadingIcon,
  MergeIcon,
  TimeIcon,
  UsdtIcon,
} from '@/app/components/icons';
import { addressFormat } from '@/app/utils';
import dayjs from 'dayjs';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { Button } from 'flowbite-react';
import CFXImage from './cfx.png';
import Image from 'next/image';

const ImageCard = ({ item, selected, onSelect, onBuy }) => {
  const { trigger, loading } = usePromiseLoading(onBuy);

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
      <div className="p-[5px] max-sm:p-[4px] relative h-[170px]">
        <div className="relative z-[3] h-full flex flex-col justify-between">
          <div className="flex-center-between z-[2]">
            <div className="text-theme flex items-center">
              <span className="text-[14px] mr-[8px] max-sm:text-[14px] bg-black w-[24px] h-[24px] rounded-[12px] flex-center text-white">
                {item.quantity === '1' ? <FragmentIcon /> : <MergeIcon />}
              </span>
            </div>
            <span className="text-[12px] bg-black px-[4px] rounded-[4px] flex-center">
              x{item.quantity}
            </span>
          </div>
          <div className="flex-1 flex-center gap-[10px]">
            <AudioPlayIcon />
            <span className='flex-1'>
              <AudioSoundIcon />
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="inline-block text-tc-secondary bg-fill-e-secondary w-auto p-[4px] rounded-[4px]">
              <div className="flex-center">
                <TimeIcon className="text-[12px] mr-[4px]" />
                <span className="text-[12px] line-clamp-1">
                  {item.locktime
                    ? dayjs.unix(item.locktime).format('MM-DD HH:mm')
                    : '-'}
                </span>
              </div>
            </div>
            <span className="bg-black p-[2] rounded-[4px] w-[24px] h-[24px] flex-center">
              <EyeIcon />
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-fill-e-primary p-[16px] max-sm:p-[10px] flex flex-col justify-between z-[2] relative">
        <div className="flex items-center justify-between">
          <div className="flex-center">
            <span className="text-tc-secondary text-[12px]">#{item.id}</span>
          </div>
          <span className="text-[14px] font-medium flex-center">
            <UsdtIcon className="text-[16px] mr-[4px] max-sm:text-[12px]" />
            {parseFloat(item.amount).toFixed(3)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-[15px] max-sm:mt-[8px]">
          <span className="text-tc-secondary text-[12px]">
            {addressFormat(item.chainto)}
          </span>
          <Button
            color="outline"
            className="max-sm:text-[12px] btn btn-outline btn-primary max-sm:h-[26px] max-sm:min-h-[26px] h-[30px] min-h-[30px] text-[12px] font-normal line-clamp-1 ml-[3px]"
            disabled={loading}
            onClick={(e) => {
              e.stopPropagation();
              trigger(item);
            }}
          >
            {loading ? (
              <LoadingIcon />
            ) : (
              <span className="line-clamp-1">
                Buy <span className="max-md:hidden">Now</span>
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
