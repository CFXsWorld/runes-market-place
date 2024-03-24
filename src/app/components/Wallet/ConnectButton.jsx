'use client';

import { useWalletStore } from '@/app/store/wallet';
import WithConnect from '@/app/components/Wallet/WithConnect';
import { Button } from 'flowbite-react';
import { ActiveIcon, ESpaceIcon, WalletIcon } from '@/app/components/icons';
import { addressFormat, addressFormatShort } from '@/app/utils';
import { cn } from '@/app/utils/classnames';
import { toast } from 'react-toastify';
import WalletInfoDropDown from '@/app/components/Wallet/WalletInfoDropDown';
import WalletInfoModal from '@/app/components/Wallet/WalletInfoModal';
import { useEffect, useState } from 'react';
import useWallet from '@/app/hooks/useWallet';
import useCISContract from '@/app/hooks/useCISContract';

const PCConnect = ({
  isConnected,
  isActive,
  account,
  isCorrectChain,
  switchChain,
  correctChainIdHex,
}) => {
  const onOpen = useWalletStore((state) => state.onOpen);
  const { browserProvider } = useWallet();
  const { contract: CISContract } = useCISContract();
  const [cis, setCIS] = useState('');

  const getCISName = async () => {
    try {
      const signer = await browserProvider.getSigner();
      const contractWithSigner = CISContract.connect(signer);
      const data = await contractWithSigner.getAddrId(account);
      if (data[0]) {
        setCIS(data[1].toString());
      }
    } catch (e) {}
  };
  useEffect(() => {
    if (account) {
      getCISName();
    }
  }, [account]);

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

  if (isConnected && isActive) {
    return (
      <div className="flex-center max-md:hidden">
        <div
          className={cn(
            'md:h-[48px] flex-center md:py-[12px] md:px-[20px] md:mr-[20px] md:rounded-[4px] md:bg-fill-e-secondary',
            !isCorrectChain && 'cursor-pointer md:bg-status-error-non-opaque'
          )}
          onClick={switchNetwork}
        >
          {isCorrectChain ? (
            <div className="flex-center">
              <ESpaceIcon className="mr-[5px]" />
              <span className="max-md:hidden">eSpace</span>
            </div>
          ) : (
            <span className="text-status-error text-[14px]">
              Switch NetWork
            </span>
          )}
        </div>
        <WalletInfoDropDown
          renderTrigger={() => (
            <Button color="secondary" className="flex-center">
              <ActiveIcon />
              <div className="ml-[5px]">
                {cis && cis !== '0' ? `CIS:${cis}` : addressFormat(account)}
              </div>
            </Button>
          )}
        />
      </div>
    );
  }

  return (
    <Button
      color="primary"
      className="flex-center max-md:hidden"
      onClick={() => {
        onOpen(true);
      }}
    >
      <WalletIcon className="text-[20px]" />
      <span className="ml-[5px]">CONNECT WALLET</span>
    </Button>
  );
};

const MobileConnect = ({
  isConnected,
  isActive,
  account,
  isCorrectChain,
  switchChain,
  correctChainIdHex,
}) => {
  const onOpen = useWalletStore((state) => state.onOpen);
  const [openInfo, onOpenInfo] = useState(false);
  const { browserProvider } = useWallet();
  const { contract: CISContract } = useCISContract();
  const [cis, setCIS] = useState('');

  const getCISName = async () => {
    try {
      const signer = await browserProvider.getSigner();
      const contractWithSigner = CISContract.connect(signer);
      const data = await contractWithSigner.getAddrId(account);
      if (data[0]) {
        setCIS(data[1].toString());
      }
    } catch (e) {}
  };
  useEffect(() => {
    if (account) {
      getCISName();
    }
  }, [account]);

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

  if (isConnected && isActive) {
    if (!isCorrectChain) {
      return (
        <Button
          color="secondary"
          className="flex-cente md:hidden bg-transparent"
          onClick={switchNetwork}
        >
          <span className="text-status-error text-[12px]">Wrong NetWork</span>
        </Button>
      );
    }

    return (
      <>
        <WalletInfoModal open={openInfo} onOpen={onOpenInfo} />
        <Button
          color="secondary"
          className="flex-center md:hidden bg-transparent relative"
          onClick={() => {
            onOpenInfo(true);
          }}
        >
          <ActiveIcon />
          <span className="ml-[5px]">
            {cis ? `CIS:${cis}` : addressFormatShort(account)}
          </span>
        </Button>
      </>
    );
  }
  return (
    <Button
      color="secondary"
      className="flex-center md:hidden bg-transparent"
      onClick={() => {
        onOpen(true);
      }}
    >
      <WalletIcon className="text-[20px]" />
    </Button>
  );
};

export default function ConnectWallet() {
  return (
    <WithConnect>
      {(props) => (
        <div className="inline-block absolute max-md:right-[12px] md:right-[24px]">
          <PCConnect {...props} />
          <MobileConnect {...props} />
        </div>
      )}
    </WithConnect>
  );
}
