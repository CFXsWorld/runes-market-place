'use client';

import useEnv from '@/app/hooks/useEnv';
import { useEffect } from 'react';
import { ActiveIcon, WalletIcon } from '@/app/components/icons';
import { addressFormat, addressFormatShort } from '@/app/utils';
import { Button } from 'flowbite-react';
import ChainInfo from '@/app/components/Wallet/ChainInfo';

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
  const renderText = (status, address) => {
    if (status === 'in-detecting') {
      return 'CONNECTING';
    }
    if (status === 'active') {
      return addressFormat(address);
    }
    return 'CONNECT WALLET';
  };

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
            className="text-[14px] text-tc-secondary cursor-pointer "
            onClick={onClick}
          >
            {addressFormatShort(account)}
          </span>
        ) : (
          <WalletIcon
            className="text-[20px] cursor-pointer"
            onClick={onClick}
          />
        )}
      </div>
      <Button
        onClick={onClick}
        color={isActive ? 'secondary' : 'primary'}
        className="flex-center max-md:hidden"
      >
        {isActive ? <ActiveIcon /> : <WalletIcon className="text-[20px]" />}

        <div className="ml-[5px]"> {renderText(status, account)}</div>
      </Button>
    </div>
  );
};

export default WalletButton;
