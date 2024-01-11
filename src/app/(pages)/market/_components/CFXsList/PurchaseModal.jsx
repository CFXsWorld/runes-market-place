'use client';

import Modal from '@/app/components/ui/Modal';
import { forwardRef, useEffect, useMemo } from 'react';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import { LoadingIcon } from '@/app/components/icons';
import useSWRMutation from 'swr/mutation';
import { formatUnits } from 'ethers';
import { usdtDecimal } from '@/app/utils';

const PurchaseModal = forwardRef(
  ({ purchaseOrder, onBuy, getUSDTBalance }, ref) => {
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
      <Modal ref={ref}>
        <div className="text-[20px]">Purchase</div>
        <div className="mt-[24px] flex flex-col">
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
          <button
            className="btn btn-primary w-full"
            disabled={!purchaseOrder || loading}
            onClick={() => {
              trigger();
            }}
          >
            {loading ? <LoadingIcon /> : 'BUY'}
          </button>
          <div className="flex mt-[12px]">
            <span>Balance:</span>
            <span className="text-theme pl-[6px]">{USDTAmount} USDT</span>
          </div>
        </div>
      </Modal>
    );
  }
);

export default PurchaseModal;
