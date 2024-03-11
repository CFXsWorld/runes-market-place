import useWallet from '@/app/hooks/useWallet';
import { toast } from 'react-toastify';
import { useWalletStore } from '@/app/store/wallet';
import useCISContract from '@/app/hooks/useCISContract';

const useSetName = ({ item, reload, onOpen }) => {
  const { browserProvider } = useWallet();
  const { contract: CISContract } = useCISContract();
  const account = useWalletStore((state) => state.account);
  const setName = async () => {
    if (item) {
      try {
        const signer = await browserProvider.getSigner();
        const contractWithSigner = CISContract.connect(signer);
        const tx = await contractWithSigner.addrRegist(item.id);
        await tx.wait();
        toast.success(`Set Name CIS: ${item.id} success !`);
        reload();
        onOpen(false);
      } catch (e) {
        console.log(e);
        toast.error('Set Name failed !');
      }
    }
  };

  return {
    setName,
    account,
  };
};
export default useSetName;
