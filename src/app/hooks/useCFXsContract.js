import { abi } from '../contracts/newCfxsContractAbi.json';
import useReadContract from '@/app/hooks/useReadContract';
import useEnv from '@/app/hooks/useEnv';

const useCFXsContract = () => {
  const { newContractAddress } = useEnv();
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

  return { totalSupply, maxCount };
};

export default useCFXsContract;
