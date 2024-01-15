import { useEffect, useMemo, useState } from 'react';
import useMounted from '@/app/hooks/useMounted';
import useResponsive from '@/app/hooks/useResponsive';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMyCFXsList } from '@/app/services';
import { pageItemCount } from '@/app/utils';
import { uniqBy } from 'lodash';
import { getAddress } from 'ethers';
import useHandleModal from '@/app/(pages)/my/_components/MyCFXsList/useHandleModal';
import { useWalletStore } from '@/app/store/wallet';

const useList = () => {
  const [listingOrder, setListingOrder] = useState(null);
  const [splitOrder, setSplitOrder] = useState(null);
  const [selected, setSelected] = useState([]);
  const [dataSource, setDataSource] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const account = useWalletStore((state) => state.account);
  const [noMore, setNoMore] = useState(false);
  const {
    openListing,
    openMerge,
    openSplit,
    openTransfer,
    onOpenListing,
    onOpenMerge,
    onOpenSplit,
    onOpenTransfer,
    openBatchListing,
    onOpenBatchListing,
  } = useHandleModal();

  const [filter, setFilter] = useState({
    index: 0,
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
    APIs.MY_CFXs_LIST,
    getMyCFXsList
  );

  const refresh = () => {
    setNoMore(false);
    setDataSource(null);
    setCurrentPage(0);
    getData({ ...transformedFilter, index: 0 }).then((res) => {
      setDataSource({ [0]: res.rows || [] });
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
  const handleListing = (item) => {
    onOpenListing(true);
    setListingOrder(item);
  };

  const handleSplit = (item) => {
    onOpenSplit(true);
    setSplitOrder(item);
  };

  const clearAll = () => {
    setSelected([]);
  };
  const selectAll = (checked) => {
    if (checked) {
      setSelected((source || []).slice(0, 24));
    } else {
      setSelected([]);
    }
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

  return {
    selected,
    onSelect,
    handleListing,
    loadMore,
    refresh,
    isMutating,
    count,
    clearAll,
    source,
    noMore,
    openListing,
    openMerge,
    openSplit,
    openTransfer,
    onOpenListing,
    onOpenMerge,
    onOpenSplit,
    onOpenTransfer,
    listingOrder,
    openBatchListing,
    onOpenBatchListing,
    selectAll,
    splitOrder,
    setSplitOrder,
    handleSplit,
    account,
  };
};

export default useList;
