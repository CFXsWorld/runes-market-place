import useWallet from '@/app/hooks/useWallet';
import { toast } from 'react-toastify';
import { getAddress, isAddress } from 'ethers';
import { useMemo, useState } from 'react';
import { useWalletStore } from '@/app/store/wallet';
import useCISContract from '@/app/hooks/useCISContract';

const useResolve = ({ item, onOpen, reload }) => {
  const [address, setAddress] = useState();
  const { browserProvider } = useWallet();
  const { contract: CISContract } = useCISContract();
  const account = useWalletStore((state) => state.account);

  const isValid = useMemo(() => {
    try {
      return isAddress(address || '');
    } catch (e) {
      return false;
    }
  }, [address]);

  const resolve = async () => {
    if (account && isValid) {
      try {
        const signer = await browserProvider.getSigner();
        const contractWithSigner = CISContract.connect(signer);
        const tx = await contractWithSigner.idRegist(item.id, address);
        await tx.wait();
        reload();
        toast.success('Resolve success !');
        onOpen(false);
      } catch (e) {
        console.log(e);
        toast.error('Resolve failed !');
      }
    }
  };
  return { resolve, address, setAddress, isValid, account };
};

export default useResolve;
