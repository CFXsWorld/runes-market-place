import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import useWallet from '@/app/hooks/useWallet';
import { parseUnits } from 'ethers';
import { toast } from 'react-toastify';
import useCFXsContract from '@/app/hooks/useCFXsContract';

const useBatchListing = ({ reload, onOpen, selected }) => {
  const [isSamePrice, setIsSamePrice] = useState(true);
  const [prices, setPrices] = useState({});
  const [duration, setDuration] = useState(dayjs().add(2, 'day'));
  const dateFormate = (date) => dayjs(date).format('YYYY-MM-DD');
  const { browserProvider } = useWallet();
  const { contract: CFXsContract } = useCFXsContract();

  const durationHours = useMemo(() => {
    return Math.ceil(dayjs(duration).diff(dayjs(), 'day', true)) * 24;
  }, [duration]);

  const listing = async () => {
    if (isValid && selected?.length) {
      try {
        const signer = await browserProvider.getSigner();
        const contractWithSigner = CFXsContract.connect(signer);
        const ids = selected
          .filter((i) => Number(i.amount) !== 0)
          .map((item) => item.id);
        const orderTypes = ids.map(() => '0');
        const confirmedPrices = ids.map((id) =>
          parseUnits(totalPricesMap[id].toString(), 18)
        );
        const tx = await contractWithSigner.LockingScriptbatch(
          ids,
          orderTypes,
          confirmedPrices,
          durationHours
        );
        await tx.wait();
        toast.success('Listing success !');
        reload();
        onOpen(false);
      } catch (e) {
        console.log(e);
        toast.error('Listing failed !');
      }
    }
  };

  const isPrice = (value) => /^\d+(\.\d*)?$/.test(value);

  const isValid = useMemo(() => {
    return (
      Object.values(prices).every(
        (price) => isPrice(price) && Number(price) > 0
      ) && durationHours > 0
    );
  }, [prices, durationHours]);

  const totalPricesMap = useMemo(() => {
    return Object.keys(prices).reduce((prev, next) => {
      const item = selected.find((n) => n.id === next);
      prev[next] = parseFloat(prices[next] || 0) * (item?.amount || 0);
      return prev;
    }, {});
  }, [prices, selected]);

  const totalPrice = useMemo(() => {
    if (isValid) {
      return Object.values(totalPricesMap).reduce((a, b) => a + Number(b), 0);
    }
    return 0;
  }, [totalPricesMap]);

  const calcEarning = useMemo(() => {
    if (isValid) {
      return Number(totalPrice) - Number(totalPrice) * 0;
    }
    return 0;
  }, [totalPrice, isValid]);

  const onSameChange = (checked) => {
    setIsSamePrice(checked);
  };

  const equalize = useCallback(
    (value) => {
      return (selected || []).reduce((prices, next) => {
        prices[next.id] = value;
        return prices;
      }, {});
    },
    [selected]
  );

  return {
    onSameChange,
    duration,
    setDuration,
    dateFormate,
    durationHours,
    isValid,
    listing,
    calcEarning,
    setPrices,
    prices,
    isSamePrice,
    equalize,
    isPrice,
    totalPricesMap,
    totalPrice,
  };
};
export default useBatchListing;
