'use client';

import { Button, Dropdown, Tabs } from 'flowbite-react';

import { AvatarIcon, CopyIcon, LogoutIcon } from '@/app/components/icons';
import { useWalletStore } from '@/app/store/wallet';
import { addressFormat } from '@/app/utils';
import { useCopy } from '@/app/hooks/useCopy';
import useDisconnect from '@/app/components/Wallet/useDisconnect';
import Link from 'next/link';
import { useState } from 'react';
import CFXsList from '@/app/components/Wallet/CFXsList';
import NFTList from '@/app/components/Wallet/NFTList';
import CoinList from '@/app/components/Wallet/CoinList';

const WalletInfoDropDown = ({ renderTrigger }) => {
  const [activeTab, setActiveTab] = useState(1);
  const account = useWalletStore((state) => state.account);
  const { copy } = useCopy();
  const { disconnect } = useDisconnect();
  return (
    <Dropdown label="" dismissOnClick renderTrigger={renderTrigger}>
      <div className="flex flex-col py-[32px] px-[24px] w-[350px]">
        <div className="flex-center-between">
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

        <div className="flex flex-col gap-[12px] my-[24px]">
          <Link href="/market">
            <Button color="primary" className="w-full">
              CFXs MARKET
            </Button>
          </Link>
          <Link href="/wormhole">
            <Button color="primary" className="w-full">
              BUY COIN
            </Button>
          </Link>
        </div>
        <div>
          <Tabs
            aria-label="Default tabs"
            style="underline"
            value={activeTab}
            onActiveTabChange={(tab) => setActiveTab(tab)}
          >
            <Tabs.Item active title="CFXs">
              <div className="h-[300px] overflow-y-auto">
                <CFXsList />
              </div>
            </Tabs.Item>
            <Tabs.Item title="NFT">
              <div className="h-[300px] overflow-y-auto">
                <NFTList />
              </div>
            </Tabs.Item>
            <Tabs.Item title="Coin">
              <div className="h-[300px] overflow-y-auto">
                <CoinList />
              </div>
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
    </Dropdown>
  );
};

export default WalletInfoDropDown;
