'use client';

import { useWalletStore } from '@/app/store/wallet';
import useEnv from '@/app/hooks/useEnv';
import { toast } from 'react-toastify';
import { Button } from 'flowbite-react';

const WithAuth = ({ children }) => {
  const isConnected = useWalletStore((state) => state.walletProvider);
  const onOpen = useWalletStore((state) => state.onOpen);
  const status = useWalletStore((state) => state.status);
  const chainId = useWalletStore((state) => state.chainId);
  const switchChain = useWalletStore((state) => state.wallet?.switchChain);
  const { correctChainId, correctChainIdHex } = useEnv();
  const isActive = status === 'active';
  const isCorrectChain = correctChainId === chainId;

  const { onClick, ...rest } = children.props;

  const switchNetwork = async () => {
    try {
      if (!isCorrectChain) {
        await switchChain(correctChainIdHex);
      }
    } catch (switchError) {
      if (switchError.code === 4902) {
        toast.error('The chain has not been added to Wallet!');
      }
    }
  };

  if (!isConnected || !isActive) {
    return (
      <Button
        {...rest}
        onClick={() => {
          onOpen(true);
        }}
      >
        CONNECT WALLET
      </Button>
    );
  }

  if (isActive && !isCorrectChain) {
    return (
      <Button onClick={switchNetwork} {...rest}>
        WRONG NETWORK
      </Button>
    );
  }

  return children;
};

export default WithAuth;
