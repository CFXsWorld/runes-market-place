import { abi } from '../contracts/oldCfxsContractAbi.json';
import useEnv from '@/app/hooks/useEnv';
import useWallet from '@/app/hooks/useWallet';
import { Contract } from 'ethers';
import { useMemo } from 'react';

const useOldCFXsContract = () => {
  const { oldContractAddress } = useEnv();

  const { browserProvider } = useWallet();

  const contract = useMemo(() => {
    return browserProvider && oldContractAddress
      ? new Contract(oldContractAddress, abi, browserProvider)
      : null;
  }, [browserProvider, oldContractAddress]);

  return { contract };
};

export default useOldCFXsContract;
