import abi from '../contracts/cis.json';
import useWallet from '@/app/hooks/useWallet';
import { Contract } from 'ethers';
import { useMemo } from 'react';

const address = '0x431d4836b36a4a95eedc4c4c48ea3249bda26fe1';

const useCISContract = () => {
  const { browserProvider } = useWallet();

  const contract = useMemo(() => {
    return browserProvider ? new Contract(address, abi, browserProvider) : null;
  }, [browserProvider]);

  return { contract };
};

export default useCISContract;
