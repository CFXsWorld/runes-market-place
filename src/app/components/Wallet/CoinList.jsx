'use client';

import { CoinTokenIcon } from '@/app/components/icons';
import { formatNumberWithCommas } from '@/app/utils';
import { useEffect, useState } from 'react';
import useERC20Contract from '@/app/hooks/useERC20Contract';
import useWallet from '@/app/hooks/useWallet';
import { useWalletStore } from '@/app/store/wallet';
import { formatUnits, getAddress, isAddress } from 'ethers';

export default function CoinList() {
  const [coinsBalance, setCoinsBalance] = useState(0);
  const { contract: ERC20Contract } = useERC20Contract();
  const { browserProvider, provider } = useWallet();
  const account = useWalletStore((state) => state.account);

  useEffect(() => {
    if (isAddress(account) && browserProvider) {
      browserProvider.getSigner().then((signer) => {
        const contractWithSigner = ERC20Contract.connect(signer);
        contractWithSigner.balanceOf(getAddress(account)).then((res) => {
          setCoinsBalance(Math.ceil(Number(formatUnits(res, 18))));
        });
      });
    }
  }, [browserProvider, account]);
  return (
    <div className="flex-center-between">
      <div className="flex-center">
        <CoinTokenIcon className="text-[40px]" />
      </div>
      <span>{formatNumberWithCommas(coinsBalance)}</span>
    </div>
  );
}
