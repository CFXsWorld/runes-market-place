'use client';

import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import PageLayout from '@/app/components/PageLayout';
import { Flowbite } from 'flowbite-react';
import WalletProvider, { useWalletStore } from '@/app/store/wallet';
import { ToastContainer } from 'react-toastify';
import { useCFXsWallet } from '@/app/components/Wallet';
import theme from '@/app/components/ui/theme';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import ConnectModal from '@/app/components/Wallet/ConnectModal';
import TxModal from '@/app/components/Wallet/TxModal';

const inter = Inter({ subsets: ['latin'] });

const WalletStatus = ({ children, wallet }) => {
  const { useStatus, useChainId, useBalance, useAccount } = wallet;
  const updateStatus = useWalletStore((state) => state.updateStatus);
  const updateChainId = useWalletStore((state) => state.updateChainId);
  const updateAccount = useWalletStore((state) => state.updateAccount);
  const updateBalance = useWalletStore((state) => state.updateBalance);
  const updateWalletFn = useWalletStore((state) => state.updateWalletFn);

  const status = useStatus();
  const chainId = useChainId();
  const account = useAccount();
  const balance = useBalance();

  console.log('current status:', status);
  useEffect(() => {
    updateStatus(status);
  }, [status]);

  useEffect(() => {
    updateChainId(chainId);
  }, [chainId]);

  useEffect(() => {
    updateAccount(account);
  }, [account]);

  useEffect(() => {
    updateBalance(balance);
  }, [balance]);

  useEffect(() => {
    updateWalletFn(wallet);
  }, [wallet]);
  return children;
};

const WithWallet = ({ children }) => {
  const walletProvider = useWalletStore((state) => state.walletProvider);
  const updateWalletProvider = useWalletStore(
    (state) => state.updateWalletProvider
  );
  const wallets = useCFXsWallet();
  const wallet = wallets[walletProvider];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const last = localStorage.getItem('walletProvider');
      updateWalletProvider(last);
    }
  }, []);

  console.log('current wallet:', walletProvider);

  if (!wallet) {
    return children;
  }
  return <WalletStatus wallet={wallet}>{children}</WalletStatus>;
};

const Dapp = ({ children }) => {
  return (
    <WalletProvider>
      <WithWallet>
        <ConnectModal />
        <TxModal />
        <Flowbite theme={{ theme }}>
          <ToastContainer
            position="bottom-left"
            theme={'dark'}
            autoClose={2000}
            closeButton={false}
          />
          <PageLayout>{children}</PageLayout>
        </Flowbite>
      </WithWallet>
    </WalletProvider>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>CFXs World</title>
      <body className={inter.className}>
        <Dapp>{children}</Dapp>
      </body>
    </html>
  );
}
