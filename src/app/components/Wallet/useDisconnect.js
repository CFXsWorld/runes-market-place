import { useWalletStore } from '@/app/store/wallet';

const useDisconnect = () => {
  const updateWalletProvider = useWalletStore(
    (state) => state.updateWalletProvider
  );
  const disconnect = () => {
    updateWalletProvider(null);
    if (typeof localStorage !== 'undefined') {
      localStorage?.setItem('walletProvider', '');
    }
  };

  return { disconnect };
};

export default useDisconnect;
