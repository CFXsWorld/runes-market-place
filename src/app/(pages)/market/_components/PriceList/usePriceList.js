import useMounted from '@/app/hooks/useMounted';
import useResponsive from '@/app/hooks/useResponsive';
import { formatNumber, formatNumberWithCommas } from '@/app/utils';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMarketStatistics } from '@/app/services';
import { useEffect, useMemo, useState } from 'react';
const items = [
  {
    label: 'Floor',
    name: 'floor',
    symbol: '$',
    format: (value) => value.toFixed(2),
  },
  {
    label: 'Unit Price',
    name: 'unitPrice',
    symbol: '$',
    format: (value) => value.toFixed(2),
  },
  {
    label: '24h Volume',
    name: '24hVolume',
    symbol: '$',
    format: formatNumberWithCommas,
  },
  {
    label: '24h Sales',
    name: '24hSales',
    symbol: '',
    format: formatNumberWithCommas,
  },
  {
    label: 'Total Volume',
    name: 'totalVolume',
    symbol: '$',
    format: formatNumberWithCommas,
  },
  {
    label: 'Total Sales',
    name: 'totalSales',
    symbol: '',
    format: formatNumberWithCommas,
  },
  {
    label: 'Owners',
    name: 'owners',
    symbol: '',
    format: formatNumberWithCommas,
  },
  {
    label: 'Listed',
    name: 'listed',
    symbol: '',
    format: formatNumber,
  },
  {
    label: 'Market Cap',
    name: 'marketCap',
    symbol: '$',
    format: formatNumberWithCommas,
  },
];

const usePriceList = () => {
  const mounted = useMounted();
  const [data, setData] = useState({});
  const { trigger: getStatistics } = useSWRMutation(
    APIs.MARKET_STATISTICS,
    getMarketStatistics,
    {
      onSuccess: (res) => {
        setData(
          Object.keys(res || {}).reduce((prev, next) => {
            prev[next] =
              res[next] === '--' || !res[next] ? 0 : Number(res[next]);
            return prev;
          }, {})
        );
      },
    }
  );
  const { count, isPC } = useResponsive(
    { min: 100, max: 140, gap: 8 },
    mounted && typeof document !== 'undefined'
      ? document.querySelector('#price-list-sentinel')
      : null
  );
  useEffect(() => {
    getStatistics();
  }, []);

  const layoutStyle = {
    display: 'grid',
    gap: '8px',
    gridTemplateColumns: `repeat(${count},1fr)`,
  };

  return {
    count,
    data,
    items,
    isPC,
    style: !isPC ? layoutStyle : {},
  };
};

export default usePriceList;
