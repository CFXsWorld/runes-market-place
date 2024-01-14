import { abi } from '../contracts/newCfxsContractAbi.json';
import useReadContract from '@/app/hooks/useReadContract';
import useEnv from '@/app/hooks/useEnv';
import useWallet from '@/app/hooks/useWallet';
import { BrowserProvider, Contract } from 'ethers';

const useCFXsContract = () => {
  const { newContractAddress } = useEnv();
  const wallet = useWallet();
  const provider = new BrowserProvider(wallet.provider);

  const contract = new Contract(newContractAddress, abi, provider);

  return { contract };
};

export default useCFXsContract;
