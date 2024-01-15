import { useWalletStore } from '@/app/store/wallet';
import { BrowserProvider } from 'ethers';
import { useMemo } from 'react';

const useWallet = () => {
  const wallet = useWalletStore((state) => state.wallet);

  const browserProvider = useMemo(
    () => wallet?.provider && new BrowserProvider(wallet.provider),
    [wallet]
  );
  return { ...wallet, browserProvider };
};

export default useWallet;
