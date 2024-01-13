import useWallet from '@/app/hooks/useWallet';
import useCFXsContract from '@/app/hooks/useCFXsContract';
import { toast } from 'react-toastify';
import { getAddress } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { pageItemCount } from '@/app/utils';
import { uniqBy } from 'lodash';

const useClaim = ({ getData }) => {
  const [selected, setSelected] = useState([]);
  const { browserProvider, useAccount } = useWallet();
  const { contract: CFXsContract } = useCFXsContract();
  const account = useAccount();
  const [dataSource, setDataSource] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [noMore, setNoMore] = useState(false);

  const transformedFilter = useMemo(() => {
    return {
      size: pageItemCount,
      startIndex: 0,
      owner: account ? getAddress(account) : undefined,
    };
  }, [account]);

  useEffect(() => {
    if (account) {
      refresh();
    }
  }, [account]);

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
  const clearAll = () => {
    setSelected([]);
  };
  const onSelect = (item) => {
    setSelected((prev) => {
      if (prev.find((re) => re.id === item.id)) {
        return prev.filter((record) => record.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const selectAll = (checked) => {
    if (checked) {
      setSelected((source || []).slice(0, 24));
    } else {
      setSelected([]);
    }
  };

  const claim = async () => {};
  return {
    claim,
    clearAll,
    selectAll,
    selected,
    source,
    refresh,
    loadMore,
    noMore,
    onSelect,
  };
};

export default useClaim;
