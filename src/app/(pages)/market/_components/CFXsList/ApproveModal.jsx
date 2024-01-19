'use client';

import { Button, Modal } from 'flowbite-react';
import { forwardRef } from 'react';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { LoadingIcon } from '@/app/components/icons';
import WithAuth from '@/app/components/Wallet/WithAuth';

const ApproveModal = forwardRef(
  ({ purchaseOrder, handleApprove, open, onOpen }, ref) => {
    const { trigger, loading } = usePromiseLoading(handleApprove);
    return (
      <Modal show={open} onClose={() => onOpen(false)}>
        <Modal.Header>Approve Purchase</Modal.Header>
        <Modal.Body>
          <div className="p-6 flex flex-col">
            <div className="flex-center-between mb-[12px]">
              <span className="text-tc-secondary">You will pay</span>
              <span className="text-white font-medium">
                {purchaseOrder?.amount || 0} USDT
              </span>
            </div>
            <div className="flex-center-between">
              <span className="text-tc-secondary">For</span>
              <span className="text-white font-medium flex-center">
                <span>{purchaseOrder?.count || 0}</span>
                <span className='text-tc-secondary text-[14px]'>Slots</span>
                <span className='px-[4px]'></span>
                <span>{purchaseOrder?.amount || 0}</span>
                <span className='text-tc-secondary text-[14px]'>CFXs</span>
              </span>
            </div>
            <div className="text-tc-secondary text-[14px] mt-[32px] mb-[24px] pt-[12px] border border-transparent border-t-fill-e-primary">
              You will be asked to approve this purchase from your wallet.
            </div>
            <WithAuth>
              <Button
                color="primary"
                className="btn btn-primary w-full"
                disabled={!purchaseOrder || loading}
                onClick={() => {
                  trigger(purchaseOrder.amount);
                }}
              >
                {loading ? <LoadingIcon /> : 'APPROVE'}
              </Button>
            </WithAuth>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
);

export default ApproveModal;
