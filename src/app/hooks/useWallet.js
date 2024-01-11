import { useCFXsWallet } from '@/app/components/Wallet';
import { useWalletStore } from '@/app/store/wallet';
import { BrowserProvider } from 'ethers';

const useWallet = () => {
  const currentWallet = useWalletStore((state) => state.walletProvider);
  const wallets = useCFXsWallet();
  const wallet = wallets[currentWallet];
  const browserProvider = new BrowserProvider(wallet.provider);
  return { ...wallet, browserProvider };
};

export default useWallet;
