'use client';

import { Dropdown } from 'flowbite-react';

import WalletDetail from '@/app/components/Wallet/WalletDetail';

const WalletInfoDropDown = ({ renderTrigger }) => {
  return (
    <Dropdown label="" dismissOnClick renderTrigger={renderTrigger}>
      <div className='w-[350px]'>
        <WalletDetail />
      </div>
    </Dropdown>
  );
};

export default WalletInfoDropDown;
