'use client';

import CFXsInfo from './_components/CFXsInfo';
import PriceList from './_components/PriceList';
import CFXsList from '@/app/(pages)/market/_components/CFXsList';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMarketStatistics } from '@/app/services';
import { useEffect, useState } from 'react';
import { parseUnits, formatUnits } from 'ethers';
import { usdtDecimal } from '@/app/utils';

export default function Market() {
  const [data, setData] = useState({});
  const { trigger: getStatistics } = useSWRMutation(
    APIs.MARKET_STATISTICS,
    getMarketStatistics,
    {
      onSuccess: (res) => {
        setData({
          ...res,
          floor: parseFloat(res.floor),
          unitPrice: parseFloat(res.unitPrice),
          '24hVolume': +formatUnits(res['24hVolume'], usdtDecimal),
          totalVolume: +formatUnits(res['totalVolume'], usdtDecimal),
        });
      },
    }
  );

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <div className="pt-[24px] w-full">
      <CFXsInfo percentage={data?.percentage} totalSupply={data?.totalSupply} />
      <PriceList data={data} />
      <CFXsList />
    </div>
  );
}
