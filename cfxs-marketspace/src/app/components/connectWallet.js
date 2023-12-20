"use client";

import React, { memo, useCallback, useEffect } from "react";

import * as FluentWallet from "@cfxjs/use-wallet-react/ethereum/Fluent";
import * as MetaMask from "@cfxjs/use-wallet-react/ethereum/MetaMask";
import * as OKXWallet from "@cfxjs/use-wallet-react/ethereum/OKX";
import {
  addressFormat,
  correctChainId,
  correctChainIdHex,
  isCorrectChainId,
} from "@/app/utils";

export default function ConnectWallet() {
  const fluentWalletStatus = FluentWallet.useStatus();
  const fluentWalletAccount = FluentWallet.useAccount();
  const fluentWalletChainId = FluentWallet.useChainId();
  const metaMaskWalletStatus = MetaMask.useStatus();
  const metaMaskWalletAccount = MetaMask.useAccount();
  const metaMaskWalletChainId = MetaMask.useChainId();
  const okxWalletStatus = OKXWallet.useStatus();
  const okxWalletAccount = OKXWallet.useAccount();
  const okxWalletChainId = OKXWallet.useChainId();

  const connectFluentWallet = () => {
    return FluentWallet.connect().then(() => {
      if (fluentWalletChainId !== correctChainId) {
        FluentWallet.switchChain(correctChainIdHex).then(() => {
          document.getElementById("walletModal").close();
        });
      } else {
        document.getElementById("walletModal").close();
      }
    });
  };
  const connectMetamask = () => {
    return MetaMask.connect().then(() => {
      if (metaMaskWalletChainId !== correctChainId) {
        MetaMask.switchChain(correctChainIdHex).then(() => {
          document.getElementById("walletModal").close();
        });
      } else {
        document.getElementById("walletModal").close();
      }
    });
  };
  const connectOKXWallet = () => {
    return OKXWallet.connect().then(() => {
      if (okxWalletChainId !== correctChainId) {
        OKXWallet.switchChain(correctChainIdHex).then(() => {
          document.getElementById("walletModal").close();
        });
      } else {
        document.getElementById("walletModal").close();
      }
    });
  };

  const _addressFormat = () =>
    addressFormat(fluentWalletAccount, metaMaskWalletAccount, okxWalletAccount);

  const _isCorrectChainId = () =>
    isCorrectChainId(
      fluentWalletAccount,
      metaMaskWalletAccount,
      okxWalletAccount,
      fluentWalletChainId,
      metaMaskWalletChainId,
      okxWalletChainId
    );

  const handleHeaderConnectWallet = () => {
    let address =
      fluentWalletAccount || metaMaskWalletAccount || okxWalletAccount;
    if (address) {
      if (!isCorrectChainId()) {
        if (fluentWalletAccount) {
          FluentWallet.switchChain(correctChainIdHex);
        } else if (metaMaskWalletAccount) {
          MetaMask.switchChain(correctChainIdHex);
        } else {
          OKXWallet.switchChain(correctChainIdHex);
        }
      } else {
        // My Assets
        console.log("assets");
      }
    } else {
      document.getElementById("walletModal").showModal();
    }
  };

  // @cfxjs/use-wallet-react has a bug in the recognition of multiple wallets, so only show the available wallet.
  return (
    <div>
      <button onClick={handleHeaderConnectWallet} className="btn btn-primary">
        {_addressFormat()
          ? `${
              _isCorrectChainId() ? "My Assets" : "Wrong Network"
            } (${_addressFormat()})`
          : "Connect Wallet"}
      </button>

      <dialog id="walletModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Connect Web3 Wallet</h3>
          <div className="pt-4 flex flex-col justify-center items-center">
            {fluentWalletStatus !== "not-installed" && (
              <div>
                <button
                  onClick={connectFluentWallet}
                  className="btn btn-primary"
                >
                  {fluentWalletStatus === "in-activating" && "Connecting..."}
                  {fluentWalletStatus === "not-active" &&
                    "Connect Fluent Wallet"}
                  {fluentWalletStatus === "active" &&
                    `${
                      _isCorrectChainId() ? "Fluent Wallet" : "Wrong Network"
                    } (${_addressFormat()})`}
                </button>
              </div>
            )}
            {/*metaMaskWalletStatus will cause Hydration Failed*/}
            {metaMaskWalletStatus !== "not-installed" && (
              <div className="mt-2">
                <button onClick={connectMetamask} className="btn btn-primary">
                  {metaMaskWalletStatus === "in-activating" && "Connecting..."}
                  {metaMaskWalletStatus === "not-active" && "Connect MetaMask"}
                  {metaMaskWalletStatus === "active" &&
                    `${
                      _isCorrectChainId() ? "MetaMask" : "Wrong Network"
                    } (${_addressFormat()})`}
                </button>
              </div>
            )}
            {okxWalletStatus !== "not-installed" && (
              <div className="mt-2">
                <button onClick={connectOKXWallet} className="btn btn-primary">
                  {okxWalletStatus === "in-activating" && "Connecting..."}
                  {okxWalletStatus === "not-active" && "Connect OKX Wallet"}
                  {okxWalletStatus === "active" &&
                    `${
                      _isCorrectChainId() ? "OKX Wallet" : "Wrong Network"
                    } (${_addressFormat()})`}
                </button>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
