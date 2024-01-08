'use client';

import { useWalletStore } from '@/app/store/wallet';
import useCFXsWallet from '@/app/components/Wallet/useCFXsWallet';
import Modal from '@/app/components/Modal';
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
const ConnectModal = forwardRef((_, ref) => {
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
      <div>
        <div className="text-[20px]">Connect a wallet</div>
        <div className="mt-[42px] flex flex-col">
          {items.map((item) => (
            <button
              key={item.type}
              onClick={() => connect(item.type)}
              className={cn(
                'btn w-full h-[60px] mb-[24px] rounded-[4px] bg-fill-e-primary border-none',
                'hover:bg-theme hover:opacity-80 text-white hover:btn-primary',
                'flex-center-between'
              )}
            >
              <span>{item.name}</span>
              {item.icon}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
});

export default ConnectModal;
