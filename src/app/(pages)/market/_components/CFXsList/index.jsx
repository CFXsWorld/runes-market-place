'use client';

import { cn } from '@/app/utils/classnames';
import Card from '../Card';
import { Waypoint } from 'react-waypoint';
import useResponsive from '@/app/hooks/useResponsive';
import useMounted from '@/app/hooks/useMounted';

const dataSource = [
  {
    id: '200001',
    symbol: 'CFXs',
    count: 1,
    unitPrice: 0.009,
    totalAmount: 0.009,
    expiredDate: '2024-01-06',
    owner: '0xfe97e85d13abd9c1c33384e796f10b73905637ce',
  },
  {
    id: '200002',
    symbol: 'CFXs',
    count: 1000,
    unitPrice: 0.009,
    totalAmount: 900,
    expiredDate: '2024-01-06',
    owner: '0xfe97e85d13abd9c1c33384e796f10b73905637ce',
  },
  {
    id: '200003',
    symbol: 'CFXs',
    count: 1000,
    unitPrice: 0.009,
    totalAmount: 900,
    expiredDate: '2024-01-06',
    owner: '0xfe97e85d13abd9c1c33384e796f10b73905637ce',
  },
  {
    id: '200004',
    symbol: 'CFXs',
    count: 1000,
    unitPrice: 0.009,
    totalAmount: 900,
    expiredDate: '2024-01-06',
    owner: '0xfe97e85d13abd9c1c33384e796f10b73905637ce',
  },
  {
    id: '200005',
    symbol: 'CFXs',
    count: 1000,
    unitPrice: 0.009,
    totalAmount: 900,
    expiredDate: '2024-01-06',
    owner: '0xfe97e85d13abd9c1c33384e796f10b73905637ce',
  },
  {
    id: '200006',
    symbol: 'CFXs',
    count: 1000,
    unitPrice: 0.009,
    totalAmount: 900,
    expiredDate: '2024-01-06',
    owner: '0xfe97e85d13abd9c1c33384e796f10b73905637ce',
  },
  {
    id: '200007',
    symbol: 'CFXs',
    count: 1000,
    unitPrice: 0.009,
    totalAmount: 900,
    expiredDate: '2024-01-06',
    owner: '0xfe97e85d13abd9c1c33384e796f10b73905637ce',
  },
  {
    id: '200008',
    symbol: 'CFXs',
    count: 1000,
    unitPrice: 0.009,
    totalAmount: 900,
    expiredDate: '2024-01-06',
    owner: '0xfe97e85d13abd9c1c33384e796f10b73905637ce',
  },
];

export default function CFXsList() {
  const mounted = useMounted();
  const { count } = useResponsive(
    { min: 200, max: 300 },
    mounted && typeof document !== 'undefined'
      ? document.querySelector('#market-sentinel')
      : null
  );

  console.log(count);
  const loadMore = () => {
    console.log('123123');
  };
  return (
    <div className="w-full">
      <div id="market-sentinel" className="w-full" />
      <div
        className="w-full"
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: `repeat(${count},1fr)`,
        }}
      >
        {dataSource.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
      <Waypoint
        scrollableAncestor={typeof window !== 'undefined' ? window : null}
        onEnter={loadMore}
      >
        <div>load more</div>
      </Waypoint>
    </div>
  );
}
