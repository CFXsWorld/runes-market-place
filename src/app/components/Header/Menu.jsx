'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/utils/classnames';

const Menu = () => {
  const pathname = usePathname()

  console.log(pathname)
  return (
    <div className="flex-center text-[16px]">
      <Link
        className={cn('border border-transparent mr-[32px] px-[20px] py-[6px]', {
          'text-theme': pathname === '/market',
        })}
        href="/market"
      >
        MARKET
      </Link>
      <Link
        className={cn(' border border-transparent px-[20px] py-[6px]', {
          'text-theme': pathname === '/myAssets',
        })}
        href="/myAssets"
      >
        MY
      </Link>
    </div>
  );
};

export default Menu;