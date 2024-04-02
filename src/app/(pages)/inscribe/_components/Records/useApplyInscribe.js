import { useMemo, useState } from 'react';
import { pageItemCount } from '@/app/utils';
import { uniqBy } from 'lodash';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMyInscribeRecords } from '@/app/services';
import { getAddress } from 'ethers';
import { useWalletStore } from '@/app/store/wallet';
import useCISContract from '@/app/hooks/useCISContract';
import { toast } from 'react-toastify';
import useWallet from '@/app/hooks/useWallet';

const useMyRecordsList = () => {
  const [refreshing, setRefreshing] = useState(0);
  const [noMore, setNoMore] = useState(false);
  const [orders, setOrders] = useState(null);
  const [open, onOpen] = useState(false);
  const account = useWalletStore((state) => state.account);
  const { contract: CISContract } = useCISContract();
  const { browserProvider } = useWallet();

  const [dataSource, setDataSource] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter] = useState({
    index: 0,
    size: pageItemCount,
    merged: 0,
    id: undefined,
    allow: 0,
    // owner: 'undefined',
  });

  const {
    data,
    isMutating,
    trigger: getData,
  } = useSWRMutation(APIs.MY_INSCRIBE_RECORDS, getMyInscribeRecords);

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
    setRefreshing(Date.now());
    setDataSource({});
    setDataSource(null);
    setCurrentPage(0);
  };
  const loadMore = async () => {
    if (account) {
      getData({
        ...filter,
        index: currentPage * pageItemCount,
      }).then((res) => {
        if (res.rows && res.rows.length === 0 && currentPage > 0) {
          setNoMore(true);
        } else {
          setCurrentPage(currentPage + 1);
          setDataSource({ ...(dataSource || {}), [currentPage]: res.rows });
        }
      });
    }
  };

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

  // 1 success 2 fail
  const apply = async (item, allowed) => {
    if (account) {
      try {
        const signer = await browserProvider.getSigner();
        const contract2WithSigner = CISContract.connect(signer);
        const tx2 = await contract2WithSigner.registAllow([item.id], [allowed]);
        await tx2.wait();
        toast.success('Success');
      } catch (e) {
        console.log(e);
        toast.error('Fail');
      }
    }
  };

  return {
    apply,
    loadMore,
    refresh,
    dataSource,
    isMutating,
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
    refreshing,
  };
};

export default useMyRecordsList;
