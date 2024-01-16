import abi from '../contracts/ERC.json';
import useEnv from '@/app/hooks/useEnv';
import useWallet from '@/app/hooks/useWallet';
import { BrowserProvider, Contract } from 'ethers';

const useERCBridgeContract = () => {
  const { ercBridgeContractAddress } = useEnv();
  const wallet = useWallet();
  const provider = new BrowserProvider(wallet.provider);
  const contract = new Contract(ercBridgeContractAddress, abi, provider);

  return { contract };
};

export default useERCBridgeContract;
