'use client';

import { Button, Modal } from 'flowbite-react';
import { forwardRef } from 'react';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { LoadingIcon, Refresh2Icon } from '@/app/components/icons';
import useClaim from '@/app/(pages)/my/_components/Attention/claim/useClaim';
import { formatNumberWithCommas } from '@/app/utils';
import Checkbox from '@/app/components/ui/Checkbox';
import ClaimableList from '@/app/(pages)/my/_components/Attention/claim/ClaimableList';

const ClaimModal = forwardRef(({ onOpen, open }, ref) => {
  const {
    claim,
    clearAll,
    selectAll,
    selected,
    source,
    refresh,
    onSelect,
    loadMore,
    isMutating,
    noMore,
    balance,
    claimableTotal,
    sync,
    syncLoading,
  } = useClaim({ open });

  const { trigger, loading } = usePromiseLoading(claim);
  return (
    <Modal show={open} onClose={() => onOpen(false)}>
      <Modal.Header>Check Claimable CFXs</Modal.Header>
      <Modal.Body>
        <div className="px-6  pb-6 flex flex-col">
          <div className="flex-center-between mb-[12px]">
            <span className="text-tc-secondary">Old World CFXs</span>
            <span className="text-white font-medium">
              {balance ? formatNumberWithCommas(balance + '') : '0'}
            </span>
          </div>
          <div className="flex-center-between mt-[12px]">
            <div className="flex-center">
              <span className="text-tc-secondary">
                Claimable:
                <span className="text-white pl-[5px]">
                  {formatNumberWithCommas(claimableTotal)}
                </span>
              </span>
              <Refresh2Icon
                className="text-theme ml-[10px] cursor-pointer hover:opacity-95"
                onClick={() => {
                  refresh();
                }}
              />
            </div>
            <Checkbox
              onChange={selectAll}
              className="text-tc-secondary max-md:text-[12px] max-md:mr-[16px]"
            >
              Select All
            </Checkbox>
          </div>
          <div className="h-[400px] overflow-y-auto mt-[10px]">
            <ClaimableList
              loadMore={loadMore}
              isMutating={isMutating}
              source={source}
              noMore={noMore}
              onSelect={onSelect}
              selected={selected}
            />
          </div>
          <div className="flex-center-between pt-[12px]">
            <div className="flex-center">
              <span className="text-tc-secondary max-md:text-[12px] w-[80px]">
                {selected.length} Item
              </span>
              <span className="text-theme cursor-pointer" onClick={clearAll}>
                Clear
              </span>
            </div>
            <div className="flex-center gap-[16px]">
              {/*<Button*/}
              {/*  color="outline"*/}
              {/*  disabled={syncLoading || loading}*/}
              {/*  className="w-[70px]"*/}
              {/*  onClick={() => {*/}
              {/*    sync();*/}
              {/*  }}*/}
              {/*>*/}
              {/*  {loading || syncLoading ? <LoadingIcon /> : 'SYNC'}*/}
              {/*</Button>*/}
              <Button
                color="primary"
                disabled={!selected.length || loading}
                className="w-[70px]"
                onClick={() => {
                  trigger();
                }}
              >
                {loading ? <LoadingIcon /> : 'CLAIM'}
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default ClaimModal;
