import { useEffect, useMemo, useState } from 'react';
import useMounted from '@/app/hooks/useMounted';
import useResponsive from '@/app/hooks/useResponsive';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMyCFSxList } from '@/app/services';
import { pageItemCount } from '@/app/utils';
import { uniqBy } from 'lodash';
import useWallet from '@/app/hooks/useWallet';
import { getAddress } from 'ethers';

const useList = () => {
  const [selected, setSelected] = useState([]);
  const [dataSource, setDataSource] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const { useAccount } = useWallet();
  const [noMore, setNoMore] = useState(false);

  const account = useAccount();

  const [filter, setFilter] = useState({
    startIndex: 0,
    size: pageItemCount,
    merged: undefined,
    id: undefined,
    owner: undefined,
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
  }, [account]);

  const mounted = useMounted();
  const { count } = useResponsive(
    { min: 200, max: 300, gap: 24, H5Min: 160 },
    mounted && typeof document !== 'undefined'
      ? document.querySelector('#my-cfxs-sentinel')
      : null
  );

  const { isMutating, trigger: getData } = useSWRMutation(
    APIs.MARKET_LIST,
    getMyCFSxList
  );

  const refresh = () => {
    setNoMore(false);
    setDataSource(null);
    setCurrentPage(0);
    getData({ ...transformedFilter, startIndex: 0 }).then((res) => {
      setDataSource({ [0]: res.rows || [] });
    });
  };
  const loadMore = async () => {
    getData({
      ...transformedFilter,
      startIndex: currentPage * pageItemCount,
    }).then((res) => {
      if (res.rows && res.rows.length === 0 && currentPage > 0) {
        setNoMore(true);
      } else {
        setCurrentPage(currentPage + 1);
        setDataSource({ ...(dataSource || {}), [currentPage]: res.rows || [] });
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
    refresh,
    isMutating,
    count,
    clearAll,
    source,
    noMore,
  };
};

export default useList;
