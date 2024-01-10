'use client';

import ConnectModal from '@/app/components/Wallet/ConnectModal';
import { useEffect, useRef, useState } from 'react';
import { useCFXsWallet } from '@/app/components/Wallet/index';
import { ESpaceIcon, WalletIcon } from '@/app/components/icons';
import { useWalletStore } from '@/app/store/wallet';
import { addressFormat, addressFormatShort } from "@/app/utils";
import useEnv from '@/app/hooks/useEnv';
import { cn } from '@/app/utils/classnames';
import { toast } from 'react-toastify';

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
          'md:h-[48px] flex-center md:py-[12px] md:px-[20px] md:mr-[20px] md:rounded-[4px] md:bg-fill-e-secondary max-md:mr-[5px]',
          !isCorrectChain && 'cursor-pointer md:bg-status-error-non-opaque'
        )}
        onClick={switchNetwork}
      >
        {isCorrectChain ? (
          <>
            <ESpaceIcon className="mr-[5px]" />
            <span className="max-md:hidden">eSpace</span>
          </>
        ) : (
          <span className="text-status-error text-[14px]">
            Switch <span className="max-md:hidden">NetWork</span>
          </span>
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

  const { correctChainId } = useEnv();

  const isActive = status === 'active';
  const isCorrectChain = correctChainId === chainId;

  useEffect(() => {}, [account]);
  return (
    <div className="flex-center">
      <ChainInfo status={status} chainId={chainId} switchChain={switchChain} />
      <div className="md:hidden">
        {!isActive ? (
          <WalletIcon
            className="text-[20px] cursor-pointer"
            onClick={onClick}
          />
        ) : isCorrectChain ? (
          <span
            className="text-[14px] text-tc-secondary cursor-pointer"
            onClick={onClick}
          >
            {addressFormatShort(account)}
          </span>
        ) : (
          <WalletIcon className="text-[20px] cursor-pointer" onClick={onClick} />
        )}
      </div>
      <button
        onClick={onClick}
        className="btn btn-primary flex-center-between rounded-[4px] max-md:hidden"
      >
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

  const currentWallet = wallets[walletProvider];

  return (
    <div className="flex-center max-md:absolute max-md:right-[16px]">
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
