import {
  abi,
  address
} from '../contracts/CFXsCISAndData.json';
import useWallet from '@/app/hooks/useWallet';
import {
  Contract
} from 'ethers';
import {
  useMemo
} from 'react';

const useCISContract = () => {
  const {
    browserProvider
  } = useWallet();

  const contract = useMemo(() => {
    return browserProvider ? new Contract(address, abi, browserProvider) : null;
  }, [browserProvider]);

  return {
    contract
  };
};

export default useCISContract;