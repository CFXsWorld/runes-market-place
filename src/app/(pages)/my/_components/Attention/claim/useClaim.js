import useWallet from '@/app/hooks/useWallet';
import useCFXsContract from '@/app/hooks/useCFXsContract';
import { toast } from 'react-toastify';
import { getAddress } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { pageItemCount } from '@/app/utils';
import { uniqBy } from 'lodash';
import useSWRMutation from 'swr/mutation';
import { APIs } from '@/app/services/request';
import { getMyOldCFXsList } from '@/app/services';
import useOldCFXsContract from '@/app/hooks/useOldCFXsContract';
import useBridgeContract from '@/app/hooks/useBridgeContract';
import { useWalletStore } from "@/app/store/wallet";

const useClaim = ({ open }) => {
  const [selected, setSelected] = useState([]);
  const { browserProvider } = useWallet();
  const { contract: CFXsContract } = useCFXsContract();
  const account = useWalletStore(state=>state.account);
  const [dataSource, setDataSource] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [noMore, setNoMore] = useState(false);

  const { contract: oldCFXsContract } = useOldCFXsContract();
  const { contract: bridgeContract } = useBridgeContract();

  const { data: balance, trigger: getBalance } = useSWRMutation(
    'balanceOf',
    () => oldCFXsContract.balanceOf(account)
  );

  const {
    data,
    isMutating,
    trigger: getData,
  } = useSWRMutation(APIs.MY_CFXs_ORDER_LIST, getMyOldCFXsList);
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
      getBalance();
    }
  }, [account, open]);

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
  const clearAll = () => {
    setSelected([]);
  };
  const onSelect = (item) => {
    if ((selected?.length || 0) < 32) {
      setSelected((prev) => {
        if (prev.find((re) => re.id === item.id)) {
          return prev.filter((record) => record.id !== item.id);
        }
        return [...prev, item];
      });
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
  };
};

export default useClaim;
