import { abi } from '../contracts/bridgeContractMainnet.json';
import useEnv from '@/app/hooks/useEnv';
import useWallet from '@/app/hooks/useWallet';
import { BrowserProvider, Contract } from 'ethers';

const useBridgeContract = () => {
  const { bridgeContractAddress } = useEnv();
  const wallet = useWallet();
  const provider = new BrowserProvider(wallet.provider);
  const contract = new Contract(bridgeContractAddress, abi, provider);

  return { contract };
};

export default useBridgeContract;
