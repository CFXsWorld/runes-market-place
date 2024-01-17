'use client';

import { RefreshIcon } from '@/app/components/icons';
import { cn } from '@/app/utils/classnames';
import useCFXsContract from '@/app/hooks/useCFXsContract';
import { useWalletStore } from '@/app/store/wallet';
import { useEffect, useState } from 'react';
import { getAddress, isAddress } from 'ethers';

const Refresh = ({ className, reload, total }) => {
  const [balance, setBalance] = useState(0);
  const { contract } = useCFXsContract();
  const account = useWalletStore((state) => state.account);

  useEffect(() => {
    if (isAddress(account)) {
      contract.balanceOf(getAddress(account)).then((res) => {
        setBalance(res.toString());
      });
    }
  }, [account]);
  return (
    <div className={cn('flex-center', className)}>
      <span className="text-tc-secondary flex-shrink-0 flex-center gap-[12px]">
        <span>Slots: {total || 0} </span>
        <span>Balance: {balance || 0}</span>
      </span>
      <RefreshIcon
        className="mx-[16px] cursor-pointer hover:opacity-80 max-md:mr-0"
        onClick={() => {
          reload();
        }}
      />
    </div>
  );
};

export default Refresh;
