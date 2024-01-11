import useWallet from '@/app/hooks/useWallet';
import { abiMulticall as usdtAbi } from '@/app/contracts/usdt.json';
import { BrowserProvider, Contract } from 'ethers';
import useEnv from '@/app/hooks/useEnv';

const useUSDTContract = () => {
  const wallet = useWallet();
  const { USDTContractAddress } = useEnv();
  const provider = new BrowserProvider(wallet.provider);

  return new Contract(USDTContractAddress, usdtAbi, provider);
};

export default useUSDTContract;
