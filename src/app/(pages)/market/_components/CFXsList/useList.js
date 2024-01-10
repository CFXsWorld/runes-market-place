import { useMemo, useState } from 'react';
import useMounted from '@/app/hooks/useMounted';
import useResponsive from '@/app/hooks/useResponsive';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMarketCFXsList } from '@/app/services';
import { pageItemCount } from '@/app/utils';
import { uniqBy } from 'lodash';

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
    amountRangeStart: undefined,
    amountRangeEnd: undefined,
    min: undefined,
  });

  const {
    data,
    isMutating,
    trigger: getData,
  } = useSWRMutation(APIs.MARKET_LIST, getMarketCFXsList);

  const refresh = (filterData = {}) => {
    setDataSource(null);
    setCurrentPage(0);
    getData({ ...filter, ...filterData, startIndex: 0 }).then((res) => {
      setDataSource({ [0]: res.rows });
    });
  };

  const loadMore = async () => {
    getData({ ...filter, startIndex: currentPage * pageItemCount }).then(
      (res) => {
        setCurrentPage(currentPage + 1);
        setDataSource({ ...(dataSource || {}), [currentPage]: res.rows });
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

  const source = useMemo(() => {
    if (dataSource) {
      return uniqBy(
        Object.keys(dataSource)
          .sort()
          .reduce((prev, next) => prev.concat(dataSource[next]), []),
        (item) => item.id
      );
    }
    return null;
  }, [dataSource]);

  return {
    selected,
    onSelect,
    onBuy,
    loadMore,
    source,
    totalResult,
    count,
    clearAll,
    isMutating,
    refresh,
    setFilter,
    filter,
  };
};

export default useList;
