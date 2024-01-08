import useOKX from '@/app/components/Wallet/useOKX';
import useEthereum from '@/app/components/Wallet/useEthereum';
import useFluent from '@/app/components/Wallet/useFluent';
import useMetaMask from '@/app/components/Wallet/useMetaMask';

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
