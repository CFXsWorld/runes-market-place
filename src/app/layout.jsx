'use client';

import { Inter } from 'next/font/google';
import PageLayout from '@/app/components/PageLayout';
import { useEffect } from 'react';
import { useWalletStore } from '@/app/store/wallet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
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
    <html lang="en">
      <title>CFXs World</title>
      <body className={inter.className}>
        <ToastContainer
          position="bottom-left"
          theme={'dark'}
          autoClose={2000}
          closeButton={false}
        />
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
