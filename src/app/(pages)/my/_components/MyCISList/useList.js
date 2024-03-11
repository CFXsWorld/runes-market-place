import { useEffect, useMemo, useState } from 'react';
import useMounted from '@/app/hooks/useMounted';
import useResponsive from '@/app/hooks/useResponsive';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMyCFXsList } from '@/app/services';
import { pageItemCount } from '@/app/utils';
import { uniqBy } from 'lodash';
import { getAddress } from 'ethers';
import { useWalletStore } from '@/app/store/wallet';

const useList = (type) => {
  const [refreshing, setRefreshing] = useState(0);
  const [item, setItem] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const account = useWalletStore((state) => state.account);
  const [noMore, setNoMore] = useState(false);

  const [resolveOpen, setResolveOpen] = useState(false);
  const [nameOpen, setNameOpen] = useState(false);

  const [filter, setFilter] = useState({
    index: 0,
    size: pageItemCount,
    merged: 0,
    id: undefined,
    owner: undefined,
    market: type,
  });

  useEffect(() => {
    if (account) {
      refresh();
    }
  }, [account]);

  const transformedFilter = useMemo(() => {
    return {
      ...filter,
      owner: account ? getAddress(account) : undefined,
    };
  }, [account, filter]);

  const mounted = useMounted();
  const { count } = useResponsive(
    { min: 254, max: 350, gap: 24, H5Min: 160 },
    mounted && typeof document !== 'undefined'
      ? document.querySelector('#my-cfxs-sentinel')
      : null
  );

  const {
    data,
    isMutating,
    trigger: getData,
  } = useSWRMutation(APIs.MY_CFXs_LIST, getMyCFXsList);

  const totalResult = useMemo(() => data?.count || 0, [data]);

  const refresh = () => {
    setRefreshing(Date.now());
    setNoMore(false);
    setDataSource(null);
    setCurrentPage(0);
    setDataSource({});
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
        setDataSource({
          ...(dataSource || {}),
          [currentPage]: res.rows || [],
        });
      }
    });
  };
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
  const handleResolve = (item) => {
    setResolveOpen(true)
    setItem(item)
  };

  const handleSetName = (item) => {
    setNameOpen(true)
    setItem(item)
  };


  return {
    loadMore,
    refresh,
    isMutating,
    count,
    source,
    noMore,
    account,
    filter,
    setFilter,
    totalResult,
    refreshing,
    handleSetName,
    handleResolve,
    resolveOpen,
    setNameOpen,
    nameOpen,
    setResolveOpen,
    item
  };
};

export default useList;
