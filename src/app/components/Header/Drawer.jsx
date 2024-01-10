'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/utils/classnames';
import { CloseIcon, MenuIcon } from '@/app/components/icons';
import { createPortal } from 'react-dom';
import { useRef } from 'react';

const Drawer = () => {
  const pathname = usePathname();
  const drawerRef = useRef();

  return (
    <div className="drawer z-[999]">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        ref={drawerRef}
      />
      <div className="drawer-content">
        <label htmlFor="my-drawer">
          <MenuIcon className="text-[24px] cursor-pointer" />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="p-4 w-80 min-h-full bg-base-200 text-base-content bg-fill-secondary">
          <div className="flex flex-col text-[16px] font-[500] text-tc-secondary">
            <div
              className="h-[56px] w-[56px]  cursor-pointer text-[24px]"
              onClick={() => {
                drawerRef.current.checked = false;
              }}
            >
              <CloseIcon />
            </div>
            <Link
              className={cn(
                'h-[48px]  bg-fill-e-primary rounded-[4px] mb-[16px]  flex items-center pl-[16px]',
                {
                  'text-theme': pathname === '/market',
                }
              )}
              href="/market"
              onClick={() => {
                drawerRef.current.checked = false;
              }}
            >
              MARKET
            </Link>
            <Link
              className={cn(
                'h-[48px] bg-fill-e-primary rounded-[4px] flex items-center pl-[16px]',
                {
                  'text-theme': pathname.includes('/my'),
                }
              )}
              href="/my"
              onClick={() => {
                drawerRef.current.checked = false;
              }}
            >
              MY
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
