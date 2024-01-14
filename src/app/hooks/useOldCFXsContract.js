import { abi } from '../contracts/oldCfxsContractAbi.json';
import useEnv from '@/app/hooks/useEnv';
import useWallet from '@/app/hooks/useWallet';
import { BrowserProvider, Contract } from 'ethers';

const useOldCFXsContract = () => {
  const { oldContractAddress } = useEnv();
  const wallet = useWallet();
  const provider = new BrowserProvider(wallet.provider);

  const contract = new Contract(oldContractAddress, abi, provider);

  return { contract };
};

export default useOldCFXsContract;
