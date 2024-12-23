'use client';

import { LogoIcon, LogoMDIcon, MenuIcon } from '@/app/components/icons';
import Menu from '@/app/components/Header/Menu';
import { ConnectButton } from '@/app/components/Wallet';
import Drawer from '@/app/components/Header/Drawer';
import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [open, onOpen] = useState(false);
  return (
    <div className="bg-fill-secondary h-[56px] w-full fixed left-0 ring-0 top-0 md:px-[24px] max-md:px-[16px] md:h-[80px] md:flex-center  z-[99]">
      <div className=" flex h-full flex-center w-full md:hidden">
        <div className="w-[46px] absolute left-[16px] ">
          <Drawer open={open} onOpen={onOpen} />
          <MenuIcon
            className="text-[24px] cursor-pointer"
            onClick={() => {
              onOpen(true);
            }}
          />
        </div>
        <Link href="/">
          <LogoMDIcon />
        </Link>
        <ConnectButton />
      </div>
      <div className="md:max-w-[1368px] w-full flex-center-between max-md:hidden relative">
        <div className="flex-center">
          <div className="flex-center mr-[85px]">
            <Link href="/">
              <LogoIcon />
            </Link>
          </div>
          <Menu />
        </div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;
