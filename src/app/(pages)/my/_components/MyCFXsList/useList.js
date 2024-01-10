import { useEffect, useState } from 'react';
import useMounted from '@/app/hooks/useMounted';
import useResponsive from '@/app/hooks/useResponsive';
const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

const useList = () => {
  const [selected, setSelected] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  const mounted = useMounted();
  const { count } = useResponsive(
    { min: 200, max: 300, gap: 24, H5Min: 160 },
    mounted && typeof document !== 'undefined'
      ? document.querySelector('#my-cfxs-sentinel')
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
  const onBuy = () => {};
  const clearAll = () => {
    setSelected([]);
  };
  const onSelect = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((record) => record !== id);
      }
      return [...prev, id];
    });
  };
  return {
    selected,
    onSelect,
    onBuy,
    loadMore,
    dataSource,
    count,
    clearAll,
  };
};

export default useList;