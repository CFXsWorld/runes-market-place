'use client';

import { LogoIcon } from "@/app/components/icons";
import Menu from "@/app/components/Header/Menu";
import ConnectWallet from "@/app/components/ConnectWallet";


const Header = () => {
  return (
    <div className="bg-fill-secondary h-[68px] w-full fixed left-0 ring-0 top-0 flex-center-between px-[60px]">
      <div className='flex-center'>
        <div className='flex-center mr-[85px]'>
          <LogoIcon className='text-[40px] text-theme'/>
          <span className='pl-[10px] font-bold'>CFXs World</span>
        </div>
        <Menu />
      </div>
      <ConnectWallet/>
    </div>
  );
};
export default Header;
