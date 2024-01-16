
import abi from '../contracts/ERC721.json';
import useEnv from '@/app/hooks/useEnv';
import useWallet from '@/app/hooks/useWallet';
import { BrowserProvider, Contract } from 'ethers';

const useERC721Contract = () => {
  const { erc721ContractAddress } = useEnv();
  const wallet = useWallet();
  const provider = new BrowserProvider(wallet.provider);
  const contract = new Contract(erc721ContractAddress, abi, provider);

  return { contract };
};

export default useERC721Contract;
