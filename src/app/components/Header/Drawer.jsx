'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/utils/classnames';
import { CloseIcon } from '@/app/components/icons';
import { Modal } from 'flowbite-react';
import { menus } from '@/app/components/Header/Menu';

const theme = {
  root: {
    base: 'fixed top-0 right-0 left-0 z-[1000] h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full justify-start',
    sizes: {
      '2xl': 'max-w-[320px]',
    },
  },
  content: {
    base: 'relative w-full p-0',
    inner:
      'relative rounded-[0] bg-fill-e-secondary shadow dark:bg-gray-700 flex flex-col h-[100vh] left-0',
  },
};

const Drawer = ({ open, onOpen }) => {
  const pathname = usePathname();
  return (
    <Modal
      show={open}
      onClose={() => onOpen(false)}
      dismissible
      theme={theme}
      position="center-left"
    >
      <Modal.Body>
        <div className="drawer z-[999] h-full">
          <ul className="p-4 w-80 min-h-full bg-base-200 text-base-content bg-fill-secondary">
            <div className="flex flex-col text-[16px] font-[500] text-tc-secondary">
              <div
                className="h-[56px] w-[56px]  cursor-pointer text-[24px]"
                onClick={() => {
                  onOpen(false);
                }}
              >
                <CloseIcon />
              </div>
              {menus.map((menu) => (
                <Link
                  key={menu.name}
                  className={cn(
                    'h-[48px]  bg-fill-e-primary rounded-[4px] mb-[16px]  flex items-center pl-[16px]',
                    {
                      'text-theme': pathname.includes(menu.path),
                    }
                  )}
                  href={menu.path}
                  onClick={() => {
                    onOpen(false);
                  }}
                >
                  {menu.name}
                </Link>
              ))}
            </div>
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Drawer;
