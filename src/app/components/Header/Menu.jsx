'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/utils/classnames';
import useDetailStore from "@/app/store/detail";

export const menus = [
  {
    name: 'Market',
    path: '/market',
  },
  {
    name: 'Wormhole',
    path: '/wormhole',
  },
  {
    name: 'My',
    path: '/my',
  },
  {
    name: 'Documents',
    path: 'https://docs.cfxs.world/',
    target: '_blank',
  },
];

const Menu = () => {
  const pathname = usePathname();

  const updateShowDetail = useDetailStore((state) => state.updateShowDetail);
  const updateDetail = useDetailStore((state) => state.updateDetail);

  return (
    <div className="flex-center text-[16px] font-[500] text-tc-secondary">
      {menus.map((menu) => (
        <Link
          key={menu.name}
          target={menu.target || ''}
          className={cn(
            'border border-transparent mr-[32px] px-[20px] py-[6px]',
            {
              'text-theme': pathname.includes(menu.path),
            }
          )}
          href={menu.path}
          onClick={()=>{
            updateShowDetail(null)
            updateDetail(null)
          }}
        >
          {menu.name}
        </Link>
      ))}
    </div>
  );
};

export default Menu;
