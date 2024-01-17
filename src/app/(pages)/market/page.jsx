'use client';

import CFXsInfo from './_components/CFXsInfo';
import PriceList from './_components/PriceList';
import CFXsList from '@/app/(pages)/market/_components/CFXsList';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMarketStatistics } from '@/app/services';
import { useEffect, useState } from 'react';
import { formatUnits } from 'ethers';
import { usdtDecimal } from '@/app/utils';
import BigNumber from 'bignumber.js';

export default function Market() {
  const [data, setData] = useState({});
  const { trigger: getStatistics } = useSWRMutation(
    APIs.MARKET_STATISTICS,
    getMarketStatistics,
    {
      onSuccess: (res) => {
        let _24hVolume = 0;
        let _totalVolume = 0;
        try {
          _24hVolume = formatUnits(
            new BigNumber(res['24hVolume'].toString()),
            usdtDecimal
          );
          _totalVolume = formatUnits(
            new BigNumber(res['totalVolume']),
            usdtDecimal
          );
        } catch (e) {
          console.log(e);
        }
        setData({
          ...res,
          floor: parseFloat(res.floor),
          unitPrice: parseFloat(res.unitPrice),
          '24hVolume': _24hVolume,
          totalVolume: _totalVolume,
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
