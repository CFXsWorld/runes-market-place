'use client';

import Attention from '@/app/(pages)/my/_components/Attention';
import MyCFXsList from '@/app/(pages)/my/_components/MyCFXsList';
import Link from 'next/link';
import { cn } from '@/app/utils/classnames';
import { useParams, usePathname } from 'next/navigation';
import Tabs from '@/app/(pages)/my/_components/Tabs';

export const tabs = [
  {
    name: 'General',
    value: 0,
    type: 'general',
    path: '/my/general',
  },
  {
    name: 'Image',
    type: 'image',
    path: '/my/image',
    value: 1,
  },
  {
    name: 'Audio',
    type: 'audio',
    path: '/my/audio',
    value: 2,
  },
  {
    name: 'Text',
    type: 'text',
    path: '/my/text',
    value: 3,
  },
  {
    name: 'Inscription',
    type: 'inscription',
    path: '/my/inscription',
    value: 4,
  },
  {
    name: 'Name',
    type: 'name',
    path: '/my/name',
    value: 5,
  },
];
export default function My() {
  const params = useParams();

  const type = params.type;

  const typeValue = tabs.find((item) => item.type === type)?.value;

  const pathname = usePathname();
  return (
    <div>
      <Tabs />
      <div className="mt-[24px]">
        <Attention />
        <div className="mt-[12px] mb-[24px]">
          <div className="flex items-center justify-between text-[16px] max-md:text-[12px] font-[500] text-tc-secondary">
            <div className="flex items-center">
              {tabs.map((tab) => (
                <Link
                  key={tab.value}
                  href={tab.path}
                  className={cn(
                    'px-[6px] mr-[32px] max-md:mr-[10px] py-[6px]   cursor-pointer',
                    {
                      'bg-fill-e-primary text-theme rounded-[6px]':
                        pathname.includes(tab.path),
                    }
                  )}
                >
                  {tab.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <MyCFXsList type={typeValue} />
      </div>
    </div>
  );
}
