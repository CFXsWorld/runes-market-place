
import abi from '../contracts/ERC20.json';
import useEnv from '@/app/hooks/useEnv';
import useWallet from '@/app/hooks/useWallet';
import { BrowserProvider, Contract } from 'ethers';

const useERC20Contract = () => {
  const { erc20ContractAddress } = useEnv();
  const wallet = useWallet();
  const provider = new BrowserProvider(wallet.provider);
  const contract = new Contract(erc20ContractAddress, abi, provider);

  return { contract };
};

export default useERC20Contract;
