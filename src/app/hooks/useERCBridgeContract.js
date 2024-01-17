import abi from '../contracts/ERC.json';
import useEnv from '@/app/hooks/useEnv';
import useWallet from '@/app/hooks/useWallet';
import { Contract } from 'ethers';
import { useCallback, useMemo } from 'react';

const useERCBridgeContract = () => {
  const { ercBridgeContractAddress } = useEnv();
  const { browserProvider } = useWallet();

  const contract = useMemo(() => {
    return browserProvider && ercBridgeContractAddress
      ? new Contract(ercBridgeContractAddress, abi, browserProvider)
      : null;
  }, [browserProvider, ercBridgeContractAddress]);

  return { contract };
};

export default useERCBridgeContract;
