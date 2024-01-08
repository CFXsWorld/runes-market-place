'use client';

import ConnectModal from '@/app/components/Wallet/ConnectModal';
import { useEffect, useRef, useState } from 'react';
import { useCFXsWallet } from '@/app/components/Wallet/index';
import { ESpaceIcon, WalletIcon } from '@/app/components/icons';
import { useWalletStore } from '@/app/store/wallet';
import { addressFormat } from '@/app/utils';
import useEnv from '@/app/hooks/useEnv';
import { cn } from '@/app/utils/classnames';
import { toast } from "react-toastify";

const getText = (status, address) => {
  if (status === 'in-detecting') {
    return 'CONNECTING';
  }
  if (status === 'active') {
    return addressFormat(address);
  }
  return 'CONNECT WALLET';
};

const ChainInfo = ({ chainId, status, switchChain }) => {
  const { correctChainId, correctChainIdHex } = useEnv();
  const isActive = status === 'active';
  const isCorrectChain = correctChainId === chainId;

  const switchNetwork = async () => {
    try {
      if (chainId !== correctChainId) {
        await switchChain(correctChainIdHex);
      }
    } catch (switchError) {
      if (switchError.code === 4902) {
        toast.error('The chain has not been added to Wallet!');
      }
    }
  };

  return (
    isActive && (
      <div
        className={cn(
          'h-[48px] flex-center py-[12px] px-[20px] mr-[20px] rounded-[4px] bg-fill-e-secondary',
          !isCorrectChain && 'cursor-pointer'
        )}
        onClick={switchNetwork}
      >
        {isCorrectChain ? (
          <>
            <ESpaceIcon className="mr-[5px]" />
            eSpace
          </>
        ) : (
          <span className="text-red-500 text-[14px]">WRONG NETWORK</span>
        )}
      </div>
    )
  );
};

const WalletButton = ({
  onClick,
  useStatus,
  useChainId,
  useBalance,
  useAccount,
  switchChain,
  type,
}) => {
  const status = useStatus();
  const chainId = useChainId();
  const account = useAccount();
  const balance = useBalance();

  console.log(status, chainId, account, balance);
  useEffect(() => {
    console.log('account!!', account);
  }, [account]);
  return (
    <div className="flex-center">
      <ChainInfo status={status} chainId={chainId} switchChain={switchChain} />
      <button onClick={onClick} className="btn btn-primary flex-center-between">
        <WalletIcon className="text-[20px]" />
        {getText(status, account)}
      </button>
    </div>
  );
};

export default function ConnectWallet() {
  const walletProvider = useWalletStore((state) => state.walletProvider);
  const modal = useRef();
  const wallets = useCFXsWallet();

  console.log(walletProvider);

  const currentWallet = wallets[walletProvider];

  return (
    <div className="flex-center">
      {currentWallet && (
        <WalletButton
          {...currentWallet}
          onClick={() => {
            modal.current.showModal();
          }}
        />
      )}

      <ConnectModal ref={modal} />
    </div>
  );
}
