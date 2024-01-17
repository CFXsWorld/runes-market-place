import abi from '../contracts/ERC721.json';
import useEnv from '@/app/hooks/useEnv';
import useWallet from '@/app/hooks/useWallet';
import { Contract } from 'ethers';
import { useMemo } from 'react';

const useERC721Contract = () => {
  const { erc721ContractAddress } = useEnv();
  const { browserProvider } = useWallet();

  const contract = useMemo(() => {
    return browserProvider && erc721ContractAddress
      ? new Contract(erc721ContractAddress, abi, browserProvider)
      : null;
  }, [browserProvider, erc721ContractAddress]);

  const getValueByIds = (ids) => {
    const calls = ids.map((id) => contract.userIDamount(id));
    return Promise.all(calls);
  };
  return { contract, getValueByIds };
};

export default useERC721Contract;
