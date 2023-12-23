"use client";
import ClaimModal from "@/app/components/claimModal";

import * as DefaultWallet from "@cfxjs/use-wallet-react/ethereum";
import * as FluentWallet from "@cfxjs/use-wallet-react/ethereum/Fluent";
import * as MetaMask from "@cfxjs/use-wallet-react/ethereum/MetaMask";
import * as OKXWallet from "@cfxjs/use-wallet-react/ethereum/OKX";
import {
  bridgeContractAddress,
  isCorrectChainId,
  maxSelectedItemsCount,
  newContractAddress,
  oldContractAddress,
  pageItemCount,
} from "@/app/utils";
import { BrowserProvider, Contract, getAddress } from "ethers";
import React, { useState } from "react";
import { abi as oldCfxsContractAbi } from "@/app/contracts/oldCfxsContractAbi.json";
// import { abi as bridgeContractAbi } from "@/app/contracts/bridgeContractTestnet.json"; //FIXME test
import { abi as bridgeContractAbi } from "@/app/contracts/bridgeContractMainnet.json"; //prod
import { toast, ToastContainer } from "react-toastify";

const globalThis = typeof window !== "undefined" ? window : {};

export default function Claim() {
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

  const [balance, setBalance] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [loadingClaim, setLoadingClaim] = useState(false);
  const [cfxsTotalCount, setCfxsTotalCount] = React.useState(0);
  const [cfxsStartIndex, setCfxsStartIndex] = React.useState(0);
  const [cfxsItems, setCfxsItems] = React.useState([]);
  const [warningText, setWarningText] = React.useState("");

  const account = () =>
    defaultWalletAccount ||
    fluentWalletAccount ||
    metaMaskWalletAccount ||
    okxWalletAccount;

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

  const browserProvier = defaultWalletAccount
    ? DefaultWallet.provider
    : fluentWalletAccount
    ? FluentWallet.provider
    : metaMaskWalletAccount
    ? MetaMask.provider
    : okxWalletAccount
    ? OKXWallet.provider
    : globalThis.ethereum;

  const provider = new BrowserProvider(browserProvier);
  const contract = new Contract(
    oldContractAddress,
    oldCfxsContractAbi,
    provider
  );
  const bridgeContract = new Contract(
    bridgeContractAddress,
    bridgeContractAbi,
    provider
  );

  const loadMoreData = (isReset) => {
    if (account()) {
      setLoadingData(true);
      if (isReset) {
        setCfxsItems(() => []);
        setCfxsTotalCount(() => 0);
        setCfxsStartIndex(() => 0);
      }
      return fetch(
        `/getCfxsList?owner=${getAddress(account())}&startIndex=${
          isReset ? 0 : cfxsStartIndex
        }&size=${pageItemCount}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCfxsTotalCount(data.count);
          if (data.rows.length > 0 && Array.isArray(data.rows)) {
            setCfxsItems(
              (isReset ? data.rows : cfxsItems.concat(data.rows)).map(
                (c, i) => {
                  return {
                    id: c.id,
                    amount: 1,
                    checked: i < maxSelectedItemsCount,
                  };
                }
              )
            );
            setCfxsStartIndex(
              (isReset ? 0 : cfxsStartIndex) + data.rows.length
            );
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoadingData(false);
        });
    }
  };

  const handleOpenClaimModal = () => {
    document.getElementById("claimModal").showModal();
    setLoadingData(true);
    setWarningText("");
    const ref = globalThis.setTimeout(() => {
      // get Cfxs balance
      contract
        .balanceOf(account())
        .then((balance) => {
          console.log(balance);
          setBalance(balance + "");
          if (balance > 0) {
            console.log("get items");
            loadMoreData(true);
          } else {
            setLoadingData(false);
          }
        })
        .catch((err) => {
          console.error(err);
          toast(err ? err.message : "Unknown Error", { type: "error" });
          setWarningText("Failed to get balance, please retry.");
          setLoadingData(false);
        });
      globalThis.clearTimeout(ref);
    }, 3000);
  };

  const handleClaim = () => {
    const checkedCfxsItems = cfxsItems.filter((c) => c.checked);
    if (checkedCfxsItems.length > 0) {
      const ids = checkedCfxsItems.map((c) => c.id);
      setLoadingClaim(true);
      provider.getSigner().then((signer) => {
        const contractWithSigner = bridgeContract.connect(signer);
        contractWithSigner
          .ExTestToMain(ids)
          .then((tx) => {
            console.log(tx);

            setWarningText(
              "Please wait for the transaction and do not close the window."
            );
            // remove claimed cfxs
            console.log(checkedCfxsItems);
            const delData = new URLSearchParams();
            delData.append("id", `[${ids.map((id) => `"${id}"`).join(",")}]`);
            delData.append("owner", getAddress(account()));
            fetch(`/del`, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: delData,
            })
              .then((data) => {
                console.log(data);
                try {
                  const jsonData = data.json();
                  if (jsonData && jsonData.state) {
                    for (let i = 0; i < jsonData.state.length; i++) {
                      const jsonDatum = jsonData[i];
                      if (!jsonDatum.ok)
                        throw new Error(jsonDatum.id + " Error");
                    }
                  }
                } catch (err) {
                  console.error(err);
                }
                // remove claimed cfxs from UI
                setCfxsItems(
                  cfxsItems
                    .filter((c) => !ids.includes(c.id))
                    .map((c, i) => {
                      return {
                        ...c,
                        checked: i < maxSelectedItemsCount,
                      };
                    })
                );
                // if (data.success) {
                // }
              })
              .catch((err) => {
                console.error(err);
                toast(err ? err.message : "Unknown Error", {
                  type: "error",
                });
              });

            tx.wait(2)
              .then((txReceipt) => {
                console.log(txReceipt);
                toast("Success: " + txReceipt.hash, {
                  type: "success",
                });
                setLoadingClaim(false);
                setWarningText("");
              })
              .catch((err) => {
                console.error(err);
                toast(err ? err.message : "Unknown Error", { type: "error" });
                setLoadingClaim(false);
                setWarningText("");
              });
          })
          .catch((err) => {
            console.error(err);
            toast(err ? err.message : "Unknown Error", { type: "error" });
            setLoadingClaim(false);
          });
      });
    }
  };

  // quick select top items
  const handleQuickSelected = (isHalf) => {
    if (cfxsItems.length > 0)
      setCfxsItems(
        cfxsItems.map((c, i) => {
          return {
            ...c,
            checked:
              i < (isHalf ? maxSelectedItemsCount / 2 : maxSelectedItemsCount),
          };
        })
      );
  };

  const handleClearSelected = () => {
    setCfxsItems(
      cfxsItems.map((c) => {
        return { ...c, checked: false };
      })
    );
  };

  return (
    <>
      <div
        role="alert"
        className="alert alert-error bg-red-100 mt-4 text-error border-none shadow-lg"
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
          <p className="mx-2 text-wrap whitespace-normal break-all">
            Please claim the cfxs from the test contract(
            <a
              className="no-underline text-primary hover:underline"
              href={"https://evm.confluxscan.io/address/" + oldContractAddress}
              target="_blank"
            >
              {oldContractAddress}
            </a>
            ) to the new contract(
            <a
              className="no-underline text-primary hover:underline"
              href={"https://evm.confluxscan.io/address/" + newContractAddress}
              target="_blank"
            >
              {newContractAddress}
            </a>
            )
          </p>
          <div className="mx-2 pt-2">
            <button
              className="btn btn-error text-white"
              onClick={handleOpenClaimModal}
              disabled={!account() || !_isCorrectChainId()}
            >
              {account()
                ? _isCorrectChainId()
                  ? "Claim Cfxs"
                  : "Wrong Network"
                : "Please connect wallet"}
            </button>
          </div>
        </div>
      </div>
      <ClaimModal
        balance={balance}
        loadingData={loadingData}
        cfxsItems={cfxsItems}
        setCfxsItems={setCfxsItems}
        loadMoreData={loadMoreData}
        cfxsTotalCount={cfxsTotalCount}
        handleClaim={handleClaim}
        refreshData={handleOpenClaimModal}
        ToastContainer={ToastContainer}
        loadingClaim={loadingClaim}
        handleQuickSelected={handleQuickSelected}
        handleClearSelected={handleClearSelected}
        warningText={warningText}
      />
    </>
  );
}
