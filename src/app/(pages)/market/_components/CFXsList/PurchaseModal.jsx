'use client';

import { Button, Modal } from 'flowbite-react';
import { forwardRef, useEffect, useMemo } from 'react';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { LoadingIcon } from '@/app/components/icons';
import useSWRMutation from 'swr/mutation';
import { formatUnits } from 'ethers';
import { usdtDecimal } from '@/app/utils';

const PurchaseModal = forwardRef(
  ({ purchaseOrder, onBuy, getUSDTBalance, onOpen, open }, ref) => {
    const { trigger, loading } = usePromiseLoading(onBuy);
    const { data = 0, trigger: getBalance } = useSWRMutation('balance', () =>
      getUSDTBalance()
    );

    useEffect(() => {
      getBalance();
    }, [purchaseOrder]);

    const USDTAmount = useMemo(() => {
      return Math.ceil(formatUnits(data, usdtDecimal));
    }, [data]);
    return (
      <Modal show={open} onClose={() => onOpen(false)}>
        <Modal.Header>Purchase</Modal.Header>
        <Modal.Body>
          <div className="p-6 flex flex-col">
            <div className="flex-center-between mb-[12px]">
              <span className="text-tc-secondary">You will pay</span>
              <span className="text-white font-medium">
                {purchaseOrder?.amount || 0}
                <span className="text-tc-secondary text-[12px]"> USDT</span>
              </span>
            </div>
            <div className="flex-center-between">
              <span className="text-tc-secondary">For</span>
              <span className="text-white font-medium text-[14px] flex items-end">
                {purchaseOrder?.count || 0}
                <span className="text-tc-secondary text-[12px] pl-[2px]">SLOTS</span>
                <span className='bg-fill-e-secondary w-[1px] h-[16px] flex mx-[5px]'/>
                {purchaseOrder.quantity || 0}
                <span className="text-tc-secondary text-[12px] pl-[2px]"> CFXs</span>
              </span>
            </div>
            <div className="text-tc-secondary text-[14px] mt-[32px] mb-[24px] pt-[12px] border border-transparent border-t-fill-e-primary">
              You will be asked to approve this purchase from your wallet.
            </div>
            <Button
              color="primary"
              className="btn btn-primary w-full"
              disabled={!purchaseOrder || loading}
              onClick={() => {
                trigger();
              }}
            >
              {loading ? <LoadingIcon /> : 'BUY'}
            </Button>
            <div className="flex mt-[12px]">
              <span>Balance:</span>
              <span className="text-theme pl-[6px]">{Number(USDTAmount||0).toFixed(2)} USDT</span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
);

export default PurchaseModal;
