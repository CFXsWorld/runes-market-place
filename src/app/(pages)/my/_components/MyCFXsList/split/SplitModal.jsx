'use client';

import { Button, Label, Modal, Radio } from 'flowbite-react';
import { forwardRef } from 'react';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { LoadingIcon } from '@/app/components/icons';
import { formatNumberWithCommas } from '@/app/utils';

import useSplit, {
  SPLIT_TYPE,
} from '@/app/(pages)/my/_components/MyCFXsList/split/useSplit';
import CustomSplit from '@/app/(pages)/my/_components/MyCFXsList/split/CustomSplit';
import ShareSplit from '@/app/(pages)/my/_components/MyCFXsList/split/ShareSplit';

const types = [
  {
    value: SPLIT_TYPE.CUSTOM,
    label: 'Custom',
  },
  {
    value: SPLIT_TYPE.SHARE,
    label: 'Share',
  },
];

const SplitModal = forwardRef(({ reload, onOpen, open, splitOrder }, ref) => {
  const {
    split,
    splitType,
    setSplitType,
    items,
    delItem,
    addItem,
    shareCount,
    setShareCount,
    onCustomValueChange,
    isValidAmount,
  } = useSplit({ splitOrder, reload, onOpen });

  const { trigger, loading } = usePromiseLoading(split);

  return (
    <Modal show={open} onClose={() => onOpen(false)}>
      <Modal.Header>Split</Modal.Header>
      <Modal.Body>
        <div className="px-6 pb-3 flex flex-col">
          <div className="flex-center-between">
            <span className="text-[14px] text-tc-secondary">
              #{splitOrder?.id}
            </span>
            <span className="text-white font-medium">
              {formatNumberWithCommas(splitOrder?.amount || 0)}
              <span className="text-tc-secondary font-normal text-[12px]">
                {' '}
                CFXs
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4 mb-[16px] mt-[24px]">
            {types.map((radio) => (
              <div className="flex items-center gap-2" key={radio.value}>
                <Radio
                  id={radio.value}
                  name={radio.label}
                  checked={radio.value === splitType}
                  onChange={(e) => {
                    setSplitType(radio.value);
                  }}
                />
                <Label
                  htmlFor={radio.value}
                  className="text-tc-secondary cursor-pointer"
                >
                  {radio.label}
                </Label>
              </div>
            ))}
          </div>
          {splitType === SPLIT_TYPE.CUSTOM ? (
            <CustomSplit
              items={items}
              delItem={delItem}
              onCustomValueChange={onCustomValueChange}
              addItem={addItem}
              isValidAmount={isValidAmount}
            />
          ) : (
            <ShareSplit
              setShareCount={setShareCount}
              shareCount={shareCount}
              isValidAmount={isValidAmount}
            />
          )}

          <Button
            color="primary"
            className="btn btn-primary w-full mt-[24px]"
            disabled={loading || !isValidAmount}
            onClick={() => {
              trigger();
            }}
          >
            {loading ? <LoadingIcon /> : 'CONFIRM SPLIT'}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default SplitModal;
