import { useEffect, useMemo, useState } from 'react';
import useMounted from '@/app/hooks/useMounted';
import useResponsive from '@/app/hooks/useResponsive';
import { pageItemCount } from '@/app/utils';
import { uniqBy } from 'lodash';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMarketCFXsList } from '@/app/services';
import { getAddress } from 'ethers';
import { useWalletStore } from '@/app/store/wallet';

const useList = () => {
  const [orders, setOrders] = useState(null);
  const [open, onOpen] = useState(false);
  const mounted = useMounted();
  const account = useWalletStore((state) => state.account);
  const { count } = useResponsive(
    { min: 200, max: 300, gap: 24, H5Min: 160 },
    mounted && typeof document !== 'undefined'
      ? document.querySelector('#market-sentinel')
      : null
  );

  const [dataSource, setDataSource] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter] = useState({
    index: 0,
    size: pageItemCount,
    owner: undefined,
  });

  const transformedFilter = useMemo(() => {
    return {
      ...filter,
      owner: account ? getAddress(account) : undefined,
    };
  }, [account]);

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

  const totalResult = useMemo(() => {
    return data?.count || 0;
  }, [data]);

  const refresh = () => {
    loadMore(true);
  };
  const loadMore = async (re) => {
    if (re) {
      setDataSource(null);
      setCurrentPage(0);
      getData({ ...transformedFilter, index: 0 }).then((res) => {
        setDataSource({ [0]: res.rows });
      });
    } else {
      getData({
        ...transformedFilter,
        index: currentPage * pageItemCount,
      }).then((res) => {
        if (res.rows && res.rows.length === 0 && currentPage > 0) {
        } else {
          setCurrentPage(currentPage + 1);
          setDataSource({ ...(dataSource || {}), [currentPage]: res.rows });
        }
      });
    }
  };

  const noMore = useMemo(() => {
    return source && source.length === totalResult;
  }, [source, totalResult]);

  const handleCancel = (item) => {
    setOrders([item]);
    onOpen(true);
  };

  const handleCancelAll = () => {
    if (source?.length > 0) {
      setOrders(source);
      onOpen(true);
    }
  };

  return {
    loadMore,
    refresh,
    dataSource,
    isMutating,
    count,
    totalResult,
    source,
    noMore,
    account,
    onOpen,
    open,
    handleCancelAll,
    handleCancel,
    orders,
    setOrders,
  };
};

export default useList;
