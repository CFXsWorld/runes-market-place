import useWallet from '@/app/hooks/useWallet';
import useCFXsContract from '@/app/hooks/useCFXsContract';
import {
  toast
} from 'react-toastify';
import {
  getAddress
} from 'ethers';
import {
  useWalletStore
} from "@/app/store/wallet";

const useMerge = ({
  selected,
  onOpen,
  reload
}) => {
  const {
    browserProvider
  } = useWallet();
  const {
    contract: CFXsContract
  } = useCFXsContract();
  const account = useWalletStore(state => state.account);
  const merge = async () => {
    if (account && selected?.length) {
      try {
        const signer = await browserProvider.getSigner();
        const contractWithSigner = CFXsContract.connect(signer);
        const data = {
          owner: getAddress(account),
          amount: selected.reduce((total, item) => total + +item.amount, 0),
          data: '',
        };
        const ids = selected.map((item) => item.id);
        const tx = await contractWithSigner.processTransaction(ids, [data]);
        await tx.wait();
        reload();
        toast.success('Merge success !');
        onOpen(false);
      } catch (e) {
        console.log(e);
        toast.error(`Merge failed \n ${e?.message||e?.response?.message||''}`);
      }
    }
  };
  return {
    merge
  };
};

export default useMerge;