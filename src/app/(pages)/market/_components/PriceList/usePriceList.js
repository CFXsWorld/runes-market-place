import useMounted from '@/app/hooks/useMounted';
import useResponsive from '@/app/hooks/useResponsive';
import { formatNumber, formatNumberWithCommas } from '@/app/utils';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMarketStatistics } from '@/app/services';
import { useEffect } from 'react';
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
    name: 'dailyVolume',
    symbol: '$',
    format: formatNumberWithCommas,
  },
  {
    label: '24h Sales',
    name: 'dailySales',
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

// const a = {
//   totalSupply: '1000',
//   percentage: '30.00',
//   floor: '--',
//   unitPrice: '30.00',
//   '24hVolume': '--',
//   '24hSales': '30',
//   totalVolume: '30',
//   totalSales: '30',
//   owners: '30',
//   listed: '30',
//   marketCap: '30',
// };

const data = {
  floor: 0.1,
  unitPrice: 0.7,
  dailyVolume: 1000,
  dailySales: 1000000,
  totalVolume: 10000,
  totalSales: 100000,
  owners: 20131,
  listed: 101131,
  marketCap: 91231111,
};
const usePriceList = () => {
  const mounted = useMounted();
  const {
    isMutating,
    trigger: getStatistics,
  } = useSWRMutation(APIs.MARKET_STATISTICS, getMarketStatistics, {
    onSuccess: (res) => {
      console.log(res);
    },
  });
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
