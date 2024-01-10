'use client';

import { LogoIcon, LogoMDIcon, MenuIcon } from '@/app/components/icons';
import Menu from '@/app/components/Header/Menu';
import { ConnectButton } from '@/app/components/Wallet';
import Drawer from '@/app/components/Header/Drawer';

const Header = () => {
  return (
    <div className="bg-fill-secondary h-[56px] w-full fixed left-0 ring-0 top-0 md:px-[60px] md:h-[80px] md:flex-center max-md:px-[20px] z-[99]">
      <div className=" flex h-full flex-center w-full md:hidden">
        <div className='w-[46px] absolute left-[20px] '>
          <Drawer />
        </div>
        <LogoMDIcon />
        <ConnectButton />
      </div>
      <div className="md:max-w-[1368px] w-full flex-center-between max-md:hidden">
        <div className="flex-center">
          <div className="flex-center mr-[85px]">
            <LogoIcon />
          </div>
          <Menu />
        </div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
