import { getAddress } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { pageItemCount } from '@/app/utils';
import { uniqBy } from 'lodash';
import { useWalletStore } from '@/app/store/wallet';
const useAssetsList = ({ open, getData }) => {
  const [selected, setSelected] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [noMore, setNoMore] = useState(false);
  const account = useWalletStore((state) => state.account);
  const transformedFilter = useMemo(() => {
    return {
      size: 30,
      index: 0,
      owner: account ? getAddress(account) : undefined,
    };
  }, [account]);

  useEffect(() => {
    if (open) {
      refresh();
    }
  }, [open]);

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

  const onSelect = (item) => {
    setSelected(item);
  };

  return {
    selected,
    source,
    refresh,
    loadMore,
    noMore,
    onSelect,
  };
};

export default useAssetsList;
