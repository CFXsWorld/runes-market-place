'use client';

import { LogoIcon } from '@/app/components/icons';
import Menu from '@/app/components/Header/Menu';
import { ConnectButton } from '@/app/components/Wallet';

const Header = () => {
  return (
    <div className="bg-fill-secondary h-[80px] w-full fixed left-0 ring-0 top-0 px-[60px] flex-center">
      <div className="md:max-w-[1600px] w-full flex-center-between">
        <div className="flex-center">
          <div className="flex-center mr-[85px]">
            <LogoIcon className="text-[40px] text-theme" />
            <span className="pl-[10px] font-bold text-[20px] text-theme">
              CFXs World
            </span>
          </div>
          <Menu />
        </div>
        <ConnectButton />
      </div>
    </div>
  );
};
export default Header;
