'use client';

import { cn } from '@/app/utils/classnames';
import Card from '../Card';
import { Waypoint } from 'react-waypoint';
import useResponsive from '@/app/hooks/useResponsive';
import useMounted from '@/app/hooks/useMounted';
import { useEffect, useState } from 'react';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export default function CFXsList() {
  const [dataSource, setDataSource] = useState([]);

  const mounted = useMounted();
  const { count } = useResponsive(
    { min: 200, max: 300 },
    mounted && typeof document !== 'undefined'
      ? document.querySelector('#market-sentinel')
      : null
  );

  const getData = async () => {
    await sleep();
    return [...new Array(30)].map(() => ({
      id: Math.floor(Math.random() * 1000000),
      symbol: 'CFXs',
      count: 1000,
      unitPrice: 0.009,
      totalAmount: 900,
      expiredDate: '2024-01-06',
      owner: '0xfe97e85d13abd9c1c33384e796f10b73905637ce',
    }));
  };

  const loadMore = async () => {
    console.log('load more');
    const data = await getData();
    setDataSource((prev) => [...prev, ...data]);
  };

  useEffect(() => {
    getData().then((res) => {
      setDataSource(res);
    });
  }, []);
  return (
    <div className="w-full pt-[32px] pb-[96px]">
      <div id="market-sentinel" className="w-full" />
      <div
        className="w-full"
        style={{
          display: 'grid',
          gap: '24px',
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
        <div className="w-full h-[60px] flex-center">load more</div>
      </Waypoint>
    </div>
  );
}
