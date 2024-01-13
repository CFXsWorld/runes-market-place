import { abi } from '../contracts/oldCfxsContractAbi.json';
import useReadContract from '@/app/hooks/useReadContract';
import useEnv from '@/app/hooks/useEnv';
import useWallet from '@/app/hooks/useWallet';
import { BrowserProvider, Contract } from 'ethers';

const useOldCFXsContract = () => {
  const { oldContractAddress } = useEnv();
  const wallet = useWallet();
  const provider = new BrowserProvider(wallet.provider);

  const { data: totalSupply = 0 } = useReadContract({
    funcName: 'totalSupply',
    abi: abi,
    address: oldContractAddress,
  });
  const { data: maxCount = 0 } = useReadContract({
    funcName: 'MAX_CFXs_COUNT',
    abi: abi,
    address: oldContractAddress,
  });

  const contract = new Contract(oldContractAddress, abi, provider);

  return { totalSupply, maxCount, contract };
};

export default useOldCFXsContract;
