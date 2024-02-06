'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/utils/classnames';
import { tabs as secTabs } from '@/app/(pages)/my/[type]/page';

const tabs = [
  {
    name: 'My CFXs',
    path: '/my/general',
  },
  {
    name: 'Orders',
    path: '/my/order',
  },
  {
    name: 'CIS',
    path: '/my/cis',
  },
];

const Tabs = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center text-[18px] font-[500] text-tc-secondary border-[2px] border-transparent border-b-fill-e-primary">
      {tabs.map((tab, index) => (
        <Link
          key={tab.name}
          className={cn(
            'border-[2px] border-transparent mr-[32px] py-[6px] h-[48px]',
            {
              'text-theme  border-b-theme':
                index === 0
                  ? secTabs.some((sec) => pathname.includes(sec.type))
                  : pathname.includes(tab.path),
            }
          )}
          href={tab.path}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
