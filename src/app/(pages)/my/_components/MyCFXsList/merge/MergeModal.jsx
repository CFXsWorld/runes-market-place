'use client';

import { Button, Modal } from 'flowbite-react';
import { forwardRef, useEffect } from 'react';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { LoadingIcon } from '@/app/components/icons';
import useMerge from '@/app/(pages)/my/_components/MyCFXsList/merge/useMerge';

const MergeModal = forwardRef(({ selected, onOpen, open, reload }, ref) => {
  const { merge } = useMerge({ reload, selected, onOpen });

  const { trigger, loading, setLoading } = usePromiseLoading(merge);

  const total = (selected || []).reduce((a, b) => a + b.amount, 0);
  return (
    <Modal
      show={open}
      onClose={() => {
        onOpen(false);
        setLoading(false);
      }}
    >
      <Modal.Header>Merge Items</Modal.Header>
      <Modal.Body>
        <div className="p-6 flex flex-col">
          <div className="flex-center-between mb-[12px]">
            <span className="text-tc-secondary">You will merge</span>
            <span className="text-white font-medium">
              {selected?.length || 0} Slots
            </span>
          </div>
          <div className="flex-center-between">
            <span className="text-tc-secondary">
              The amount of new CFXs will be
            </span>
            <span className="text-white font-medium">{total} CFXs</span>
          </div>
          <div className="text-tc-secondary text-[14px] mt-[32px] mb-[24px] pt-[12px] border border-transparent border-t-fill-e-primary">
            The merged CFXs will generate a new CFXs ID. The amount of new CFXs
            according to the total amount of merged CFXs.
          </div>
          <Button
            color="primary"
            className="btn btn-primary w-full"
            disabled={!selected || (loading && open)}
            onClick={() => {
              trigger();
            }}
          >
            {loading && open ? <LoadingIcon /> : 'CONFIRM MERGE'}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default MergeModal;
