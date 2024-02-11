'use client';

import CFXsList from '@/app/(pages)/market/_components/CFXsList';
import { useParams, usePathname } from 'next/navigation';
import CFXsInfo from '@/app/(pages)/market/_components/CFXsInfo';
import PriceList from '@/app/(pages)/market/_components/PriceList';
import Link from 'next/link';
import { cn } from '@/app/utils/classnames';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMarketStatistics } from '@/app/services';
import { useEffect, useMemo } from 'react';
import { formatUnits } from 'ethers';
import { usdtDecimal } from '@/app/utils';

export const tabs = [
  {
    name: 'General',
    value: 0,
    type: 'general',
    path: '/market/general',
  },
  {
    name: 'Image',
    type: 'image',
    path: '/market/image',
    value: 1,
  },
  {
    name: 'Audio',
    type: 'audio',
    path: '/market/audio',
    value: 2,
  },
  {
    name: 'Text',
    type: 'text',
    path: '/market/text',
    value: 3,
  },
  {
    name: 'Inscription',
    type: 'inscription',
    path: '/market/inscription',
    value: 4,
  },
  {
    name: 'Name',
    type: 'name',
    path: '/market/name',
    value: 5,
  },
];
export default function Market() {
  const params = useParams();

  const type = params.type;

  const typeValue = tabs.find((item) => item.type === type)?.value;

  const pathname = usePathname();
  const { data, trigger: getStatistics } = useSWRMutation(
    APIs.MARKET_STATISTICS,
    getMarketStatistics
  );

  const formattedData = useMemo(() => {
    if (!data) return {};
    return {
      ...data,
      floor: parseFloat(data.floor),
      unitPrice: parseFloat(data.unitPrice),
      '24hVolume': formatUnits(
        BigInt(data['24hVolume']).toString(),
        usdtDecimal
      ),
      totalVolume: formatUnits(
        BigInt(data['totalVolume']).toString(),
        usdtDecimal
      ),
    };
  }, [data]);

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <div className="pt-[24px] w-full">
      <CFXsInfo
        percentage={formattedData?.percentage}
        totalSupply={formattedData?.totalSupply}
      />
      <PriceList data={formattedData} />
      <div className="pt-[24px] max-md:pt-[20px]">
        <div className="mt-[12px]">
          <div className="flex items-center justify-between text-[18px] max-md:text-[12px] font-[500] text-tc-secondary">
            <div className="flex items-center">
              {tabs.map((tab) => (
                <Link
                  key={tab.value}
                  href={tab.path}
                  className={cn(
                    'border-[2px] border-transparent mr-[32px] max-md:mr-[10px] py-[6px] h-[42px] max-md:h-[38px] cursor-pointer',
                    {
                      'text-theme  border-b-theme': pathname.includes(tab.path),
                    }
                  )}
                >
                  {tab.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*<CFXsList type={typeValue} />*/}
    </div>
  );
}
