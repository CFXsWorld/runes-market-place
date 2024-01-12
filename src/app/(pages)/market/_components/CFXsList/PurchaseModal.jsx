'use client';

import { Button, Modal } from "flowbite-react";
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
                {purchaseOrder?.amount || 0} USDT
              </span>
            </div>
            <div className="flex-center-between">
              <span className="text-tc-secondary">For</span>
              <span className="text-white font-medium">
                {purchaseOrder?.count || 0} CFXs
              </span>
            </div>
            <div className="text-tc-secondary text-[14px] mt-[32px] mb-[24px] pt-[12px] border border-transparent border-t-fill-e-primary">
              You will be asked to approve this purchase from your wallet.
            </div>
            <Button
              color='primary'
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
              <span className="text-theme pl-[6px]">{USDTAmount} USDT</span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
);

export default PurchaseModal;
