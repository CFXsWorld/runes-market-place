import useMounted from '@/app/hooks/useMounted';
import useResponsive from '@/app/hooks/useResponsive';
import { formatNumber, formatNumberWithCommas } from '@/app/utils';
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
    format: formatNumber,
  },
  {
    label: '24h Sales',
    name: '24hSales',
    symbol: '',
    format: formatNumber,
  },
  {
    label: 'Total Volume',
    name: 'totalVolume',
    symbol: '$',
    format: formatNumber,
  },
  {
    label: 'Total Sales',
    name: 'totalSales',
    symbol: '',
    format: formatNumber,
  },
  {
    label: 'Owners',
    name: 'owners',
    symbol: '',
    format: formatNumber,
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
    format: formatNumber,
  },
];

const usePriceList = () => {
  const mounted = useMounted();
  const { count, isPC } = useResponsive(
    { min: 100, max: 140, gap: 8 },
    mounted && typeof document !== 'undefined'
      ? document.querySelector('#price-list-sentinel')
      : null
  );

  const layoutStyle = {
    display: 'grid',
    gap: '8px',
    gridTemplateColumns: `repeat(${count},1fr)`,
  };

  return {
    count,
    items,
    isPC,
    style: !isPC ? layoutStyle : {},
  };
};

export default usePriceList;
