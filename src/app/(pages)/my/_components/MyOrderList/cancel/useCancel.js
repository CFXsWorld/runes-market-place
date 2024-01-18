import useWallet from '@/app/hooks/useWallet';
import useCFXsContract from '@/app/hooks/useCFXsContract';
import { toast } from 'react-toastify';
import { useWalletStore } from "@/app/store/wallet";

const useCancel = ({ orders, onOpen, reload }) => {
  const { browserProvider } = useWallet();
  const { contract: CFXsContract } = useCFXsContract();
  const account = useWalletStore(state=>state.account);


  const cancel = async () => {
    if (account && orders?.length) {
      try {
        const signer = await browserProvider.getSigner();
        const contractWithSigner = CFXsContract.connect(signer);
        const ids = orders.map((item) => item.id);
        const tx = await contractWithSigner.OwnerUnlockingScript(ids[0]);
        await tx.wait();
        reload();
        toast.success('Cancel success !');
        onOpen(false);
      } catch (e) {
        console.log(e);
        toast.error('Cancel failed !');
      }
    }
  };
  return { cancel };
};

export default useCancel;
