"use client";

import Header from "@/app/components/header";
import Claim from "@/app/components/claim";
import * as FluentWallet from "@cfxjs/use-wallet-react/ethereum/Fluent";
import * as MetaMask from "@cfxjs/use-wallet-react/ethereum/MetaMask";
import * as OKXWallet from "@cfxjs/use-wallet-react/ethereum/OKX";

export default function Container({ children }) {
  const fluentWalletAccount = FluentWallet.useAccount();
  const metaMaskWalletAccount = MetaMask.useAccount();
  const okxWalletAccount = OKXWallet.useAccount();

  return (
    <div className="min-h-screen container mx-auto text-gray-800 font-light p-3">
      <Header />
      <Claim />
      {fluentWalletAccount}
      {metaMaskWalletAccount}
      {okxWalletAccount}
      {children}
    </div>
  );
}
