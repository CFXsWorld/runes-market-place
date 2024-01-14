'use client';

import ConnectModal from '@/app/components/Wallet/ConnectModal';
import { useState } from 'react';
import { useCFXsWallet } from '@/app/components/Wallet/index';
import { useWalletStore } from '@/app/store/wallet';
import WalletButton from '@/app/components/Wallet/WalletButton';

export default function ConnectWallet() {
  const walletProvider = useWalletStore((state) => state.walletProvider);
  const [open, onOpen] = useState(false);
  const wallets = useCFXsWallet();

  const currentWallet = wallets[walletProvider];

  return (
    <div className="flex-center max-md:absolute max-md:right-[16px]">
      {currentWallet && (
        <WalletButton
          {...currentWallet}
          onClick={() => {
            onOpen(true);
          }}
        />
      )}

      <ConnectModal open={open} onOpen={onOpen} />
    </div>
  );
}
