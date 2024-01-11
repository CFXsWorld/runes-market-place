import { useCFXsWallet } from '@/app/components/Wallet';
import { useWalletStore } from '@/app/store/wallet';

const useWallet = () => {
  const currentWallet = useWalletStore((state) => state.walletProvider);
  const wallets = useCFXsWallet();
  return wallets[currentWallet];
};

export default useWallet;
