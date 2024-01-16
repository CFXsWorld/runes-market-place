import abi from '../contracts/ERC20.json';
import useEnv from '@/app/hooks/useEnv';
import useWallet from '@/app/hooks/useWallet';
import { Contract } from 'ethers';
import { useMemo } from 'react';

const useERC20Contract = () => {
  const { erc20ContractAddress } = useEnv();
  const { browserProvider } = useWallet();

  const contract = useMemo(() => {
    return browserProvider && erc20ContractAddress
      ? new Contract(erc20ContractAddress, abi, browserProvider)
      : null;
  }, [browserProvider, erc20ContractAddress]);

  return { contract };
};

export default useERC20Contract;
