'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/utils/classnames';

const Tabs = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center text-[18px] font-[500] text-tc-secondary border-[2px] border-transparent border-b-fill-e-primary">
      <Link
        className={cn(
          'border-[2px] border-transparent mr-[32px] py-[6px] h-[48px]',
          {
            'text-theme  border-b-theme': pathname.includes('/cfxs'),
          }
        )}
        href="/my/cfxs"
      >
        My CFXs
      </Link>
      <Link
        className={cn(
          ' border-[2px] border-transparent py-[6px] h-[48px]',
          {
            'text-theme  border-b-theme':  pathname.includes('/order'),
          }
        )}
        href="/my/order"
      >
        Orders
      </Link>
    </div>
  );
};

export default Tabs;
