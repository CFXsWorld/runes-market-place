import useWallet from '@/app/hooks/useWallet';
import useCFXsContract from '@/app/hooks/useCFXsContract';
import { toast } from 'react-toastify';
import { getAddress, isAddress } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { pageItemCount } from '@/app/utils';
import { uniqBy } from 'lodash';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { fetchSyncData, getMyOldCFXsList } from '@/app/services';
import useOldCFXsContract from '@/app/hooks/useOldCFXsContract';
import useBridgeContract from '@/app/hooks/useBridgeContract';
import { useWalletStore } from '@/app/store/wallet';
import { Toast } from 'flowbite-react';

const useClaim = ({ open }) => {
  const [selected, setSelected] = useState([]);
  const { browserProvider } = useWallet();
  const { contract: CFXsContract } = useCFXsContract();
  const account = useWalletStore((state) => state.account);
  const [dataSource, setDataSource] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [noMore, setNoMore] = useState(false);
  const [balance, setBalance] = useState(0);

  const { contract: oldCFXsContract } = useOldCFXsContract();
  const { contract: bridgeContract } = useBridgeContract();

  const getBalance = async () => {
    if (oldCFXsContract && account) {
      return oldCFXsContract?.balanceOf?.(account);
    }
    return 0;
  };

  const {
    data,
    isMutating,
    trigger: getData,
  } = useSWRMutation(APIs.MY_CFXs_ORDER_LIST, getMyOldCFXsList);

  const { isMutating: syncLoading, trigger: syncData } = useSWRMutation(
    APIs.CLAIM_SYNC_DATA,
    fetchSyncData
  );

  const sync = () => {
    if (isAddress(account)) {
      syncData({ owner: account ? getAddress(account) : undefined })
        .then((e) => {
          toast('Data synced successfully, Once every 24 hours');
        })
        .catch((e) => {
          console.log(e);
          toast.warn('Frequent operation, Please try again later');
        });
    }
  };

  const claimableTotal = useMemo(() => {
    return data?.count || 0;
  }, [data]);
  const transformedFilter = useMemo(() => {
    return {
      size: pageItemCount,
      index: 0,
      owner: account ? getAddress(account) : undefined,
    };
  }, [account]);

  useEffect(() => {
    if (account && open) {
      refresh();
      getBalance().then((res) => {
        setBalance(res);
      });
    }
  }, [account, open]);

  const refresh = () => {
    setNoMore(false);
    setDataSource(null);
    setCurrentPage(0);
    setSelected([]);
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
  const clearAll = () => {
    setSelected([]);
  };
  const onSelect = (item) => {
    const isSelected = selected?.find((re) => re.id === item.id);
    if (isSelected) {
      setSelected(selected.filter((record) => record.id !== item.id));
    } else {
      if ((selected?.length || 0) < 32) {
        setSelected([...selected, item]);
      }
    }
  };

  const selectAll = (checked) => {
    if (checked) {
      setSelected((source || []).slice(0, 32));
    } else {
      setSelected([]);
    }
  };

  const claim = async () => {
    if (selected?.length > 0 && account) {
      try {
        const signer = await browserProvider.getSigner();
        const contractWithSigner = bridgeContract.connect(signer);
        const ids = selected.map((item) => item.id);
        const tx = await contractWithSigner.ExTestToMain(ids);
        await tx.wait();
        refresh();
        toast.success('Claim success !');
      } catch (e) {
        console.log(e);
        toast.error('Claim failed !');
      }
    }
  };

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
    isMutating,
    balance,
    claimableTotal,
    sync,
    syncLoading,
  };
};

export default useClaim;
