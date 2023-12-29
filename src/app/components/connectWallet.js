"use client";

import React, { memo, useCallback, useEffect } from "react";

import * as DefaultWallet from "@cfxjs/use-wallet-react/ethereum";
import * as FluentWallet from "@cfxjs/use-wallet-react/ethereum/Fluent";
import * as MetaMask from "@cfxjs/use-wallet-react/ethereum/MetaMask";
import * as OKXWallet from "@cfxjs/use-wallet-react/ethereum/OKX";
import { addressFormat, isCorrectChainId } from "@/app/utils";
import { useRouter } from "next/navigation";

export default function ConnectWallet() {
  const router = useRouter();
  const defaultWalletStatus = DefaultWallet.useStatus();
  const defaultWalletAccount = DefaultWallet.useAccount();
  const defaultWalletChainId = DefaultWallet.useChainId();
  const fluentWalletStatus = FluentWallet.useStatus();
  const fluentWalletAccount = FluentWallet.useAccount();
  const fluentWalletChainId = FluentWallet.useChainId();
  const metaMaskWalletStatus = MetaMask.useStatus();
  const metaMaskWalletAccount = MetaMask.useAccount();
  const metaMaskWalletChainId = MetaMask.useChainId();
  const okxWalletStatus = OKXWallet.useStatus();
  const okxWalletAccount = OKXWallet.useAccount();
  const okxWalletChainId = OKXWallet.useChainId();

  const connectDefaultWallet = () => {
    return DefaultWallet.connect().then(() => {
      if (defaultWalletChainId !== process.env.NEXT_PUBLIC_CorrectChainId) {
        DefaultWallet.switchChain(process.env.NEXT_PUBLIC_CorrectChainIdHex).then(() => {
          document.getElementById("walletModal").close();
        });
      } else {
        document.getElementById("walletModal").close();
      }
    });
  };

  const connectFluentWallet = () => {
    return FluentWallet.connect().then(() => {
      if (fluentWalletChainId !== process.env.NEXT_PUBLIC_CorrectChainId) {
        FluentWallet.switchChain(process.env.NEXT_PUBLIC_CorrectChainIdHex).then(() => {
          document.getElementById("walletModal").close();
        });
      } else {
        document.getElementById("walletModal").close();
      }
    });
  };

  const connectMetamask = () => {
    return MetaMask.connect().then(() => {
      if (metaMaskWalletChainId !== process.env.NEXT_PUBLIC_CorrectChainId) {
        MetaMask.switchChain(process.env.NEXT_PUBLIC_CorrectChainIdHex).then(() => {
          document.getElementById("walletModal").close();
        });
      } else {
        document.getElementById("walletModal").close();
      }
    });
  };

  const connectOKXWallet = () => {
    return OKXWallet.connect().then(() => {
      if (okxWalletChainId !== process.env.NEXT_PUBLIC_CorrectChainId) {
        OKXWallet.switchChain(process.env.NEXT_PUBLIC_CorrectChainIdHex).then(() => {
          document.getElementById("walletModal").close();
        });
      } else {
        document.getElementById("walletModal").close();
      }
    });
  };

  const _addressFormat = () => addressFormat(defaultWalletAccount, fluentWalletAccount, metaMaskWalletAccount, okxWalletAccount);

  const _isCorrectChainId = () =>
    isCorrectChainId(
      defaultWalletAccount,
      fluentWalletAccount,
      metaMaskWalletAccount,
      okxWalletAccount,
      defaultWalletChainId,
      fluentWalletChainId,
      metaMaskWalletChainId,
      okxWalletChainId
    );

  const handleHeaderConnectWallet = () => {
    let address = defaultWalletAccount || fluentWalletAccount || metaMaskWalletAccount || okxWalletAccount;
    if (address) {
      if (!_isCorrectChainId()) {
        if (defaultWalletAccount) {
          DefaultWallet.switchChain(process.env.NEXT_PUBLIC_CorrectChainIdHex);
        }
        if (fluentWalletAccount) {
          FluentWallet.switchChain(process.env.NEXT_PUBLIC_CorrectChainIdHex);
        } else if (metaMaskWalletAccount) {
          MetaMask.switchChain(process.env.NEXT_PUBLIC_CorrectChainIdHex);
        } else {
          OKXWallet.switchChain(process.env.NEXT_PUBLIC_CorrectChainIdHex);
        }
      } else {
        // My Assets
        console.log("assets");
        router.push("/myAssets");
      }
    } else {
      document.getElementById("walletModal").showModal();
    }
  };

  // @cfxjs/use-wallet-react has a bug in the recognition of multiple wallets, so only show the available wallet.
  return (
    <div>
      <button onClick={handleHeaderConnectWallet} className="btn btn-primary">
        {_addressFormat() ? `${_isCorrectChainId() ? "My Assets" : "Wrong Network"} (${_addressFormat()})` : "Connect Wallet"}
      </button>

      <dialog id="walletModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Connect Web3 Wallet</h3>
          <div className="pt-4 flex flex-col justify-center items-center">
            {defaultWalletStatus !== "not-installed" && (
              <div className="mt-2">
                <button onClick={connectDefaultWallet} className="btn btn-primary">
                  {defaultWalletStatus === "in-activating" && "Connecting..."}
                  {defaultWalletStatus === "not-active" && "Connect Default Web3 Wallet"}
                  {defaultWalletStatus === "active" && `${_isCorrectChainId() ? "Default Web3 Wallet" : "Wrong Network"} (${_addressFormat()})`}
                </button>
              </div>
            )}
            {fluentWalletStatus !== "not-installed" && (
              <div className="mt-2">
                <button onClick={connectFluentWallet} className="btn btn-primary">
                  {fluentWalletStatus === "in-activating" && "Connecting..."}
                  {fluentWalletStatus === "not-active" && "Connect Fluent Wallet"}
                  {fluentWalletStatus === "active" && `${_isCorrectChainId() ? "Fluent Wallet" : "Wrong Network"} (${_addressFormat()})`}
                </button>
              </div>
            )}
            {/*metaMaskWalletStatus will cause Hydration Failed*/}
            {metaMaskWalletStatus !== "not-installed" && (
              <div className="mt-2">
                <button onClick={connectMetamask} className="btn btn-primary">
                  {metaMaskWalletStatus === "in-activating" && "Connecting..."}
                  {metaMaskWalletStatus === "not-active" && "Connect MetaMask"}
                  {metaMaskWalletStatus === "active" && `${_isCorrectChainId() ? "MetaMask" : "Wrong Network"} (${_addressFormat()})`}
                </button>
              </div>
            )}
            {okxWalletStatus !== "not-installed" && (
              <div className="mt-2">
                <button onClick={connectOKXWallet} className="btn btn-primary">
                  {okxWalletStatus === "in-activating" && "Connecting..."}
                  {okxWalletStatus === "not-active" && "Connect OKX Wallet"}
                  {okxWalletStatus === "active" && `${_isCorrectChainId() ? "OKX Wallet" : "Wrong Network"} (${_addressFormat()})`}
                </button>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
