import useEnv from '@/app/hooks/useEnv';
import { Contract, JsonRpcProvider } from 'ethers';
import useSWR from 'swr';

const useReadContract = ({ funcName, abi, address }) => {
  const { eSpaceRPC } = useEnv();
  const provider = new JsonRpcProvider(eSpaceRPC);
  const contract = new Contract(address, abi, provider);

  const { data, error, isLoading } = useSWR(`${address}/${funcName}`, () =>
    contract[funcName]()
  );

  return {
    data,
    error,
    isLoading,
    contract,
  };
};

export default useReadContract;
