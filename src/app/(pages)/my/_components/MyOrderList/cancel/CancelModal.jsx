'use client';

import { Button, Modal } from 'flowbite-react';
import { forwardRef } from 'react';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { LoadingIcon, WarningIcon } from '@/app/components/icons';
import useCancel from '@/app/(pages)/my/_components/MyOrderList/cancel/useCancel';

const CancelModal = forwardRef(({ orders, onOpen, open, reload }, ref) => {
  const { cancel } = useCancel({ reload, orders, onOpen });

  const { trigger, loading, setLoading } = usePromiseLoading(cancel);
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
        <div className="p-6 flex flex-col  bg-fill-e-secondary ">
          <div className="flex-center-between my-[24px]">
            <span className="text-tc-secondary">You will cancel</span>
            <span className="text-white font-medium">
              {orders?.length || 0} listings
            </span>
          </div>
          <Button
            color="primary"
            className="btn btn-primary w-full"
            disabled={!orders || loading}
            onClick={() => {
              trigger();
            }}
          >
            {loading ? <LoadingIcon /> : 'CONFIRM CANCEL'}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default CancelModal;
