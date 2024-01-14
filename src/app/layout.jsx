'use client';

import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import PageLayout from '@/app/components/PageLayout';
import {  Flowbite, ThemeModeScript } from "flowbite-react";
import WalletProvider, { useWalletStore } from '@/app/store/wallet';
import { ToastContainer } from 'react-toastify';
import theme from '@/app/components/ui/theme';

import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const Dapp = ({ children }) => {
  const updateWalletProvider = useWalletStore(
    (state) => state.updateWalletProvider
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const last = localStorage.getItem('walletProvider');
      if (last !== 'Fluent' && last !== 'MetaMask') {
        updateWalletProvider('Fluent');
      } else {
        updateWalletProvider(last);
      }
    }
  }, []);

  return (
    <Flowbite theme={{ theme }}>
      <ToastContainer
        position="bottom-left"
        theme={'dark'}
        autoClose={2000}
        closeButton={false}
      />
      <PageLayout>{children}</PageLayout>
    </Flowbite>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeModeScript />
      <title>CFXs World</title>
      <body className={inter.className}>
        <WalletProvider>
          <Dapp>{children}</Dapp>
        </WalletProvider>
      </body>
    </html>
  );
}
