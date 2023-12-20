"use client";
import ClaimModal from "@/app/components/claimModal";

import * as FluentWallet from "@cfxjs/use-wallet-react/ethereum/Fluent";
import * as MetaMask from "@cfxjs/use-wallet-react/ethereum/MetaMask";
import * as OKXWallet from "@cfxjs/use-wallet-react/ethereum/OKX";
import { isCorrectChainId } from "@/app/utils";

export default function Claim() {
  const fluentWalletStatus = FluentWallet.useStatus();
  const fluentWalletAccount = FluentWallet.useAccount();
  const fluentWalletChainId = FluentWallet.useChainId();
  const metaMaskWalletStatus = MetaMask.useStatus();
  const metaMaskWalletAccount = MetaMask.useAccount();
  const metaMaskWalletChainId = MetaMask.useChainId();
  const okxWalletStatus = OKXWallet.useStatus();
  const okxWalletAccount = OKXWallet.useAccount();
  const okxWalletChainId = OKXWallet.useChainId();

  const _isConnectWallet = () =>
    fluentWalletAccount || metaMaskWalletAccount || okxWalletAccount;

  const _isCorrectChainId = () =>
    isCorrectChainId(
      fluentWalletAccount,
      metaMaskWalletAccount,
      okxWalletAccount,
      fluentWalletChainId,
      metaMaskWalletChainId,
      okxWalletChainId
    );

  return (
    <>
      <div
        role="alert"
        className="alert alert-error bg-red-100 mt-4 text-error border-none shadow-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-10 w-10 ml-2"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>

        <div>
          <h3 className="mx-2 font-bold">Attention:</h3>
          <p className="mx-2">
            Please claim the cfxs from the test contract(
            <a
              className="no-underline text-primary hover:underline"
              href="https://evm.confluxscan.io/address/0xc6e865c213c89ca42a622c5572d19f00d84d7a16"
              target="_blank"
            >
              0xc6e865c213c89ca42a622c5572d19f00d84d7a16
            </a>
            ) to the new contract(
            <a
              className="no-underline text-primary hover:underline"
              href="https://evm.confluxscan.io/address/0xc6e865c213c89ca42a622c5572d19f00d84d7a16"
              target="_blank"
            >
              0xc6e865c213c89ca42a622c5572d19f00d84d7a16
            </a>
            )
          </p>
          <div className="mx-2 pt-2">
            <button
              className="btn btn-error text-white"
              onClick={() => document.getElementById("claimModal").showModal()}
              disabled={!_isConnectWallet() || !_isCorrectChainId()}
            >
              {_isConnectWallet()
                ? _isCorrectChainId()
                  ? "Claim Cfxs"
                  : "Wrong Network"
                : "Please connect wallet"}
            </button>
          </div>
        </div>
      </div>
      <ClaimModal />
    </>
  );
}
