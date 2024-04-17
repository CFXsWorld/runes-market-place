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
  const wallet = useWalletStore((state) => state.wallet || OKXWallet);

  const browserProvider = useMemo(() => {
    return OKXWallet?.provider && new BrowserProvider(OKXWallet?.provider);
  }, []);

  return {
    ...wallet,
    browserProvider,
    wallet
  };
};

export default useWallet;