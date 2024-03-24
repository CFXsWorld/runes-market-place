'use client';

import MyRecordsList from '@/app/(pages)/inscribe/_components/Records/MyRecordsList';
import useCISContract from '@/app/hooks/useCISContract';
import { useEffect, useState } from 'react';
import { useWalletStore } from '@/app/store/wallet';
import useWallet from '@/app/hooks/useWallet';
import {  getAddress, isAddress } from 'ethers';
import AdminApplyList from '@/app/(pages)/inscribe/_components/Records/AdminApplyList';
import { cn } from '@/app/utils/classnames';

const Records = () => {
  const [listType, setListType] = useState('record');
  const { contract: CISContract } = useCISContract();
  const [isAdmin, setIsAdmin] = useState(false);
  const account = useWalletStore((state) => state.account);
  const { wallet, browserProvider } = useWallet();
  const checkUserAdminAccess = async () => {
    if (account && isAddress(account)) {
      const signer = await browserProvider?.getSigner();
      if (signer) {
        const contract2WithSigner = CISContract.connect(signer);
        const isAdmin = await contract2WithSigner.dataRecorder(
          getAddress(account)
        );
        console.log('isAdmin', isAdmin);
        setIsAdmin(isAdmin);
      }
    }
  };

  useEffect(() => {
    if (account && wallet) {
      checkUserAdminAccess();
    }
  }, [account, wallet]);

  return (
    <div>
      <div className="flex items-center gap-[30px]">
        <p
          className={cn(
            'text-tc-secondary text-[18px] mb-[20px] font-bold cursor-pointer',
            listType === 'record' && 'text-white '
          )}
          onClick={() => {
            setListType('record');
          }}
        >
          Records
        </p>
        {isAdmin && (
          <p
            className={cn(
              'text-tc-secondary text-[18px] mb-[20px] font-bold cursor-pointer',
              listType === 'submit' && 'text-white '
            )}
            onClick={() => {
              setListType('submit');
            }}
          >
            Submitting
          </p>
        )}
      </div>

      {listType === 'record' && <MyRecordsList />}
      {listType === 'submit' && isAdmin && <AdminApplyList />}
    </div>
  );
};

export default Records;
