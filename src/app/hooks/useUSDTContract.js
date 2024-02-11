import useWallet from '@/app/hooks/useWallet';
import { abiMulticall as usdtAbi } from '@/app/contracts/usdt.json';
import { Contract } from 'ethers';
import useEnv from '@/app/hooks/useEnv';
import { useMemo } from 'react';

const useUSDTContract = () => {
  const { USDTContractAddress } = useEnv();
  const { browserProvider } = useWallet();

  const contract = useMemo(() => {
    return browserProvider && USDTContractAddress
      ? new Contract(USDTContractAddress, usdtAbi, browserProvider)
      : null;
  }, [browserProvider, USDTContractAddress]);

  return contract;
};

export default useUSDTContract;
