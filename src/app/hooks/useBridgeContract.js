import { abi } from '../contracts/bridgeContractMainnet.json';
import useEnv from '@/app/hooks/useEnv';
import useWallet from '@/app/hooks/useWallet';
import { Contract } from 'ethers';
import { useMemo } from 'react';

const useBridgeContract = () => {
  const { bridgeContractAddress } = useEnv();
  const { browserProvider } = useWallet();

  const contract = useMemo(() => {
    return browserProvider && bridgeContractAddress
      ? new Contract(bridgeContractAddress, abi, bridgeContractAddress)
      : null;
  }, [browserProvider, bridgeContractAddress]);

  return { contract };
};

export default useBridgeContract;
