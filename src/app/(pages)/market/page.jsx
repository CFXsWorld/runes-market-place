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
import Tabs from '@/app/components/ui/Tabs';

const tabs = [
  {
    name: 'General',
    value: 0,
  },
  {
    name: 'Image',
    value: 1,
  },
  {
    name: 'Audio',
    value: 2,
  },
  {
    name: 'Text',
    value: 3,
  },
  // {
  //   name: 'Rune',
  //   value: 4,
  // },
  // {
  //   name: 'Name',
  //   value: 5,
  // },
];

export default function Market() {
  const [data, setData] = useState({});
  const [type, setType] = useState(0);
  const { trigger: getStatistics } = useSWRMutation(
    APIs.MARKET_STATISTICS,
    getMarketStatistics,
    {
      onSuccess: (res) => {
        let _24hVolume = 0;
        let _totalVolume = 0;

        try {
          _totalVolume = formatUnits(
            BigInt(res['totalVolume']).toString(),
            usdtDecimal
          );
        } catch (e) {
          console.log(e);
        }
        try {
          _24hVolume = formatUnits(
            BigInt(res['24hVolume']).toString(),
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
      <div className="mt-[12px]">
        <Tabs
          value={type}
          onActiveTabChange={(tab) => setType(tab.value)}
          tabs={tabs}
        />
      </div>
      {type === 0 && <CFXsList refreshFloor={getStatistics} type={type} />}
      {type === 1 && <CFXsList refreshFloor={getStatistics} type={type} />}
      {type === 2 && <CFXsList refreshFloor={getStatistics} type={type} />}
      {type === 3 && <CFXsList refreshFloor={getStatistics} type={type} />}
    </div>
  );
}
