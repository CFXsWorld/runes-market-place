'use client';

import { useWalletStore } from '@/app/store/wallet';
import useCFXsWallet from '@/app/hooks/useCFXsWallet';
import Modal from '@/app/components/ui/Modal';
import { forwardRef } from 'react';
import { cn } from '@/app/utils/classnames';
import { FluentIcon, MetamaskIcon } from '@/app/components/icons';

const WalletProvider = {
  Ethereum: 'Ethereum',
  OKX: 'OKX',
  Fluent: 'Fluent',
  MetaMask: 'MetaMask',
};

const items = [
  {
    name: 'Metamask',
    icon: <MetamaskIcon />,
    type: WalletProvider.MetaMask,
  },
  {
    name: 'Fluent',
    icon: <FluentIcon />,
    type: WalletProvider.Fluent,
  },
];
const ApproveModal = forwardRef(({ purchaseOrder }, ref) => {
  const updateWalletProvider = useWalletStore(
    (state) => state.updateWalletProvider
  );
  const wallets = useCFXsWallet();
  const connect = async (type) => {
    const wallet = wallets[type];
    const { connect } = wallet;
    try {
      await connect();
    } catch (e) {
    } finally {
      updateWalletProvider(type);
      localStorage.setItem('walletProvider', type);
      ref.current.close();
    }
  };

  return (
    <Modal outside ref={ref}>
      <div className="text-[20px]">Approve Purchase</div>
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
        <button className="btn btn-primary w-full" disabled={!purchaseOrder}>
          APPROVE
        </button>
      </div>
    </Modal>
  );
});

export default ApproveModal;
