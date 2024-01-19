import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import useWallet from '@/app/hooks/useWallet';
import { parseUnits } from 'ethers';
import { toast } from 'react-toastify';
import useCFXsContract from '@/app/hooks/useCFXsContract';

const fee= 0;
const useListing = ({ listingOrder, reload, onOpen }) => {
  const [price, setPrice] = useState();
  const [duration, setDuration] = useState(dayjs().add(2, 'day'));
  const dateFormate = (date) => dayjs(date).format('YYYY-MM-DD');
  const { browserProvider } = useWallet();
  const { contract: CFXsContract } = useCFXsContract();

  const durationHours = useMemo(() => {
    return Math.ceil(dayjs(duration).diff(dayjs(), 'day', true)) * 24;
  }, [duration]);

  const listing = async () => {
    if (isValid && listingOrder && Number(listingOrder.amount) > 0) {
      try {
        const signer = await browserProvider.getSigner();
        const contractWithSigner = CFXsContract.connect(signer);
        const tx = await contractWithSigner.LockingScriptbatch(
          [listingOrder.id],
          ['0'],
          [parseUnits(price, 18)],
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

  const isPrice = (value) => /^\d+(\.\d+)?$/.test(value);

  const isValid = useMemo(() => {
    return isPrice(price) && Number(price) > 0 && durationHours > 0;
  }, [price, durationHours]);

  const calcEarning = useMemo(() => {
    return isValid ? Number(price) - Number(price) * fee : 0;
  }, [price, isValid]);

  return {
    price,
    setPrice,
    duration,
    setDuration,
    dateFormate,
    durationHours,
    isValid,
    listing,
    calcEarning,
    isPrice,
  };
};
export default useListing;
