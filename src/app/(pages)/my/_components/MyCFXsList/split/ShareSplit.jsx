'use client';

import { TextInput } from 'flowbite-react';
import { cn } from '@/app/utils/classnames';
import { WarningIcon } from '@/app/components/icons';

const ShareSplit = ({ setShareCount, shareCount, isValidAmount }) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <TextInput
        type="text"
        onChange={(e) => {
          setShareCount(e.target.value);
        }}
        value={shareCount}
        placeholder="Can be divided into 1-24 parts"
        required
        color="primary"
      />
      <div className="flex-center-between mb-[10px]">
        <span className="text-tc-secondary">Count</span>
        <span
          className={cn('text-theme font-medium', {
            'text-red-500': shareCount > 24,
            'text-status-warning': shareCount === 24,
          })}
        >
          {shareCount}
        </span>
      </div>
      <div className="flex-center-between mb-[20px]">
        <span className="text-tc-secondary  text-[14px]">
          The amount of new CFXs shards is the selected CFXs amount evenly
          divided by the set number of share.
        </span>
      </div>
      {!isValidAmount && (
        <div className="mt-[10px] bg-theme-non-opaque py-[12px] px-[16px] flex items-center rounded-[4px]">
          <WarningIcon />
          <span className="text-theme text-[14px] ml-[10px]">
            The number entered is not dividable by the amount of the CFXs.
          </span>
        </div>
      )}
    </div>
  );
};

export default ShareSplit;
