import useWallet from '@/app/hooks/useWallet';
import useCFXsContract from '@/app/hooks/useCFXsContract';
import { toast } from 'react-toastify';
import { getAddress, isAddress } from 'ethers';
import { useMemo, useState } from 'react';

const useTransfer = ({ selected, onOpen, reload }) => {
  const [address, setAddress] = useState();
  const { browserProvider, useAccount } = useWallet();
  const { contract: CFXsContract } = useCFXsContract();
  const account = useAccount();

  const isValid = useMemo(() => {
    try {
      return isAddress(address || '');
    } catch (e) {
      return false;
    }
  }, [address]);

  const transfer = async () => {
    if (account && isValid) {
      try {
        const signer = await browserProvider.getSigner();
        const contractWithSigner = CFXsContract.connect(signer);
        const ids = selected.map((item) => item.id);
        const tx = await contractWithSigner['transfer(uint256[], address)'](
          ids,
          address
        );
        await tx.wait();
        reload();
        toast.success('Transfer success !');
        onOpen(false);
      } catch (e) {
        console.log(e);
        toast.error('Transfer failed !');
      }
    }
  };
  return { transfer, address, setAddress, isValid };
};

export default useTransfer;
