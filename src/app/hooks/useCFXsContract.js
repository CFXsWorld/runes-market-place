import { abi } from '../contracts/newCfxsContractAbi.json';
import useEnv from '@/app/hooks/useEnv';
import useWallet from '@/app/hooks/useWallet';
import { Contract } from 'ethers';
import { useMemo } from 'react';

const useCFXsContract = () => {
  const { newContractAddress } = useEnv();
  const { browserProvider } = useWallet();

  const contract = useMemo(() => {
    return browserProvider && newContractAddress
      ? new Contract(newContractAddress, abi, browserProvider)
      : null;
  }, [browserProvider, newContractAddress]);


  return { contract };
};

export default useCFXsContract;
