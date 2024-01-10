import { useMemo, useState } from 'react';
import useMounted from '@/app/hooks/useMounted';
import useResponsive from '@/app/hooks/useResponsive';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMarketCFXsList } from '@/app/services';
import { pageItemCount } from '@/app/utils';

const useList = () => {
  const [selected, setSelected] = useState([]);
  const [dataSource, setDataSource] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const mounted = useMounted();
  const { count } = useResponsive(
    { min: 200, max: 300, gap: 24, H5Min: 160 },
    mounted && typeof document !== 'undefined'
      ? document.querySelector('#market-sentinel')
      : null
  );

  const [filter, setFilter] = useState({
    startIndex: 0,
    size: pageItemCount,
    ao: 0,
    amountRangeStart: 0,
    amountRangeEnd: undefined,
    min: undefined,
  });

  const {
    data,
    isMutating,
    trigger: getData,
  } = useSWRMutation(APIs.MARKET_LIST, getMarketCFXsList);

  const refresh = () => {
    setDataSource(null);
  };

  const loadMore = async () => {
    getData({ ...filter, startIndex: (currentPage + 1) * pageItemCount }).then(
      (res) => {
        setDataSource([...(dataSource || []), ...(res.rows || [])]);
        setCurrentPage(currentPage + 1);
      }
    );
  };

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

  const totalResult = useMemo(() => {
    return data?.count || 0;
  }, [data]);
  return {
    selected,
    onSelect,
    onBuy,
    loadMore,
    dataSource,
    totalResult,
    data,
    count,
    clearAll,
    isMutating,
    refresh,
  };
};

export default useList;
