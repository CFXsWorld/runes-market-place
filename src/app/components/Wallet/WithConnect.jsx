'use client';

import { useWalletStore } from '@/app/store/wallet';
import useEnv from '@/app/hooks/useEnv';

const WithConnect = ({ children }) => {
  const isConnected = useWalletStore((state) => state.walletProvider);
  const status = useWalletStore((state) => state.status);
  const chainId = useWalletStore((state) => state.chainId);
  const account = useWalletStore((state) => state.account);
  const connect = useWalletStore((state) => state.wallet?.connect);
  const switchChain = useWalletStore((state) => state.wallet?.switchChain);
  const { correctChainId, correctChainIdHex } = useEnv();
  const isActive = status === 'active';
  const isCorrectChain = correctChainId === chainId;

  return children({
    isConnected,
    isActive,
    isCorrectChain,
    switchChain,
    correctChainIdHex,
    connect,
    account,
  });
};

export default WithConnect;
