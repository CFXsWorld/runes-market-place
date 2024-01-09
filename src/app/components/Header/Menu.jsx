'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/utils/classnames';

const Menu = () => {
  const pathname = usePathname();

  return (
    <div className="flex-center text-[16px] font-[500] text-tc-secondary">
      <Link
        className={cn(
          'border border-transparent mr-[32px] px-[20px] py-[6px]',
          {
            'text-theme': pathname === '/market',
          }
        )}
        href="/market"
      >
        MARKET
      </Link>
      <Link
        className={cn(' border border-transparent px-[20px] py-[6px]', {
          'text-theme': pathname.includes('/my'),
        })}
        href="/my"
      >
        MY
      </Link>
    </div>
  );
};

export default Menu;
