'use client';
import { AvatarIcon, CopyIcon, LogoutIcon } from '@/app/components/icons';
import { addressFormat } from '@/app/utils';
import Link from 'next/link';
import { Button, Tabs } from 'flowbite-react';
import CFXsList from '@/app/components/Wallet/CFXsList';
import NFTList from '@/app/components/Wallet/NFTList';
import CoinList from '@/app/components/Wallet/CoinList';
import { useState } from 'react';
import { useWalletStore } from '@/app/store/wallet';
import { useCopy } from '@/app/hooks/useCopy';
import useDisconnect from '@/app/components/Wallet/useDisconnect';

const WalletDetail = () => {
  const [activeTab, setActiveTab] = useState(1);
  const account = useWalletStore((state) => state.account);
  const { copy } = useCopy();
  const { disconnect } = useDisconnect();
  return (
    <div className="flex flex-col py-[32px] w-full  bg-fill-e-secondary ">
      <div className="flex-center-between  px-[24px]">
        <div className="flex-center">
          <AvatarIcon />
          <div className="flex flex-col ml-[10px]">
            <span className="pb-[4px]">CFXs World Assets</span>
            <span className="flex items-center text-tc-secondary text-[14px] gap-[10px]">
              {addressFormat(account)}
              <CopyIcon
                className="text-tc-secondary hover:text-theme  cursor-pointer"
                onClick={() => {
                  copy(addressFormat(account));
                }}
              />
            </span>
          </div>
        </div>
        <LogoutIcon
          className="text-tc-secondary hover:text-theme text-[24px] cursor-pointer"
          onClick={disconnect}
        />
      </div>

      <div className="flex flex-col gap-[12px] my-[24px]  px-[24px]">
        <Link href="/market">
          <Button color="primary" className="w-full">
            CFXs MARKET
          </Button>
        </Link>
        <Button color="primary" className="w-full" disabled>
          BUY COIN
        </Button>
      </div>
      <Tabs
        aria-label="Default tabs"
        style="underline"
        value={activeTab}
        onActiveTabChange={(tab) => setActiveTab(tab)}
      >
        <Tabs.Item active title="CFXs">
          <div className="h-[300px] overflow-y-auto  px-[24px]">
            <CFXsList />
          </div>
        </Tabs.Item>
        <Tabs.Item title="NFT">
          <div className="h-[300px] overflow-y-auto  px-[24px]" key={activeTab}>
            <NFTList activeTab={activeTab}/>
          </div>
        </Tabs.Item>
        <Tabs.Item title="Coin">
          <div className="h-[300px] overflow-y-auto px-[24px]">
            <CoinList />
          </div>
        </Tabs.Item>
      </Tabs>
    </div>
  );
};

export default WalletDetail;
