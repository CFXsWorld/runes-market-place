import useOKX from '@/app/hooks/useOKX';
import useEthereum from '@/app/hooks/useEthereum';
import useFluent from '@/app/hooks/useFluent';
import useMetaMask from '@/app/hooks/useMetaMask';

const WalletProvider = {
  Ethereum: 'Ethereum',
  OKX: 'OKX',
  Fluent: 'Fluent',
  MetaMask: 'MetaMask',
};

const useCFXsWallet = () => {
  const OKXWallet = useOKX();
  const ethereumWallet = useEthereum();
  const fluentWallet = useFluent();
  const MetaMaskWallet = useMetaMask();

  return {
    [WalletProvider.OKX]: ethereumWallet,
    [WalletProvider.MetaMask]: ethereumWallet,
    [WalletProvider.Fluent]: fluentWallet,
    [WalletProvider.Ethereum]: ethereumWallet,
  };
};

export default useCFXsWallet;