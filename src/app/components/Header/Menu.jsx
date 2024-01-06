'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/utils/classnames';

const Menu = () => {
  const pathname = usePathname()

  console.log(pathname)
  return (
    <div className="flex-center">
      <Link
        className={cn('border border-transparent mr-[20px] px-[32px] py-[6px]', {
          'border-theme rounded-[8px]': pathname === '/market',
        })}
        href="/market"
      >
        MARKET
      </Link>
      <Link
        className={cn(' border border-transparent px-[32px] py-[6px]', {
          'border-theme rounded-[8px]': pathname === '/myAssets',
        })}
        href="/myAssets"
      >
        MY
      </Link>
    </div>
  );
};

export default Menu;
