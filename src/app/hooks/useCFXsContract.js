import { abi } from '../contracts/newCfxsContractAbi.json';
import useReadContract from '@/app/hooks/useReadContract';
import useEnv from '@/app/hooks/useEnv';
import useWallet from '@/app/hooks/useWallet';
import { BrowserProvider, Contract } from 'ethers';

const useCFXsContract = () => {
  const { newContractAddress } = useEnv();
  const wallet = useWallet();
  const provider = new BrowserProvider(wallet.provider);

  const { data: totalSupply = 0 } = useReadContract({
    funcName: 'totalSupply',
    abi: abi,
    address: newContractAddress,
  });
  const { data: maxCount = 0 } = useReadContract({
    funcName: 'MAX_CFXs_COUNT',
    abi: abi,
    address: newContractAddress,
  });

  const contract = new Contract(newContractAddress, abi, provider);

  return { totalSupply, maxCount, contract };
};

export default useCFXsContract;
