import { useEffect, useMemo, useState } from 'react';
import useMounted from '@/app/hooks/useMounted';
import useResponsive from '@/app/hooks/useResponsive';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMarketCFXsList } from '@/app/services';
import { pageItemCount } from '@/app/utils';
import { omit, uniqBy } from 'lodash';

const useList = () => {
  const [checkAll, setCheckAll] = useState(false);
  const [selected, setSelected] = useState([]);
  const [dataSource, setDataSource] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [noMore, setNoMore] = useState(false);
  const mounted = useMounted();
  const { count } = useResponsive(
    { min: 200, max: 300, gap: 24, H5Min: 160 },
    mounted && typeof document !== 'undefined'
      ? document.querySelector('#market-sentinel')
      : null
  );

  const [filter, setFilter] = useState({
    recently: 0,
    merged: 0,
    owner: undefined,
    quantity_min: 0,
    unit_price_start: undefined,
    unit_price_end: undefined,
    index: 0,
    size: pageItemCount,
    price_asc: 0,
    id: undefined,
    // hack
    orderType: 'ASC',
    searchValue: '',
  });

  const transformedFilter = useMemo(() => {
    const order = {
      recently: 0,
      merged: 0,
      price_asc: 0,
      id: undefined,
      owner: undefined,
    };
    if (filter.orderType) {
      if (filter.orderType === 'ASC') {
        order.price_asc = 0;
      }
      if (filter.orderType === 'DESC') {
        order.price_asc = 1;
      }

      if (filter.orderType === 'RECENTLY') {
        order.recently = 1;
      }

      if (filter.orderType === 'ENDING') {
        order.recently = 2;
      }

      if (filter.orderType === 'MERGED') {
        order.merged = 2;
      }

      if (filter.orderType === 'FRAGMENT') {
        order.merged = 1;
      }
    }
    if (filter.searchValue) {
      if (/^\d+$/.test(filter.searchValue)) {
        order.id = filter.searchValue;
      } else {
        order.owner = filter.searchValue;
      }
    }
    return { ...omit(filter, ['orderType', 'searchValue']), ...order };
  }, [filter]);

  const {
    data,
    isMutating,
    trigger: getData,
  } = useSWRMutation(APIs.MARKET_LIST, getMarketCFXsList);

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

  const refresh = () => {
    setNoMore(false);
    setDataSource(null);
    setSelected([]);
    setCheckAll(false);
    setCurrentPage(0);
    getData({ ...transformedFilter, index: 0 }).then((res) => {
      setDataSource({ [0]: res.rows });
    });
  };

  const loadMore = async () => {
    getData({
      ...transformedFilter,
      index: currentPage * pageItemCount,
    }).then((res) => {
      if (res.rows && res.rows.length === 0 && currentPage > 0) {
        setNoMore(true);
      } else {
        setCurrentPage(currentPage + 1);
        setDataSource({ ...(dataSource || {}), [currentPage]: res.rows });
      }
    });
  };

  const clearAll = () => {
    setSelected([]);
    setCheckAll(false);
  };

  const onSelect = (item) => {
    const isSelected = selected?.find((re) => re.id === item.id);
    if (isSelected) {
      setSelected(selected.filter((record) => record.id !== item.id));
    } else {
      if ((selected?.length || 0) < 24) {
        setSelected([...selected, item]);
      }
    }
  };

  useEffect(() => {
    if (selected?.length === 24) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [selected]);

  const selectAll = (checked) => {
    setCheckAll(checked);
    if (checked) {
      setSelected((source || []).slice(0, 24));
    } else {
      setSelected([]);
    }
  };

  const totalResult = useMemo(() => {
    return data?.count || 0;
  }, [data]);

  return {
    selected,
    onSelect,
    loadMore,
    source,
    totalResult,
    count,
    clearAll,
    isMutating,
    refresh,
    setFilter,
    filter,
    selectAll,
    noMore,
    checkAll,
    setCheckAll,
  };
};

export default useList;
