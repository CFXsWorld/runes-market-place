import {
  useWalletStore
} from '@/app/store/wallet';
import {
  BrowserProvider
} from 'ethers';
import {
  useMemo
} from 'react';
import * as OKXWallet from '@cfxjs/use-wallet-react/ethereum';


const useWallet = () => {
  const wallet = useWalletStore((state) => state.wallet);

  const browserProvider = useMemo(() => {
    return new BrowserProvider(wallet.provider || OKXWallet.provider);
  }, [wallet?.provider]);

  return {
    ...wallet,
    browserProvider,
    wallet
  };
};

export default useWallet;