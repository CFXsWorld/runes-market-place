"use client";
import ClaimModal from "@/app/components/claimModal";

import * as FluentWallet from "@cfxjs/use-wallet-react/ethereum/Fluent";
import * as MetaMask from "@cfxjs/use-wallet-react/ethereum/MetaMask";
import * as OKXWallet from "@cfxjs/use-wallet-react/ethereum/OKX";
import {
  bridgeContractAddress,
  isCorrectChainId,
  maxSelectedItemsCount,
  oldContractAddress,
} from "@/app/utils";
import { BrowserProvider, Contract } from "ethers";
import React, { useState } from "react";
import { abi as oldCfxsContractAbi } from "@/app/contracts/oldCfxsContractAbi.json";
import bridgeContractAbi from "@/app/contracts/bridgeContractAbi.json";
import { toast, ToastContainer } from "react-toastify";

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

  const [balance, setBalance] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [loadingClaim, setLoadingClaim] = useState(false);
  const [cfxsTotalCount, setCfxsTotalCount] = React.useState(2000);
  const [cfxsStartIndex, setCfxsStartIndex] = React.useState(0);
  const [cfxsItems, setCfxsItems] = React.useState([]);

  const account = () =>
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

  const browserProvier = fluentWalletAccount
    ? FluentWallet.provider
    : metaMaskWalletAccount
    ? MetaMask.provider
    : okxWalletAccount
    ? OKXWallet.provider
    : window.ethereum;

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
    console.log(isReset);
    setLoadingData(true);
    return fetch(
      `/getCfxsList?owner=${
        "0xf9BE9cd007021Dc84EAE2E9793D24a72225D12e9" || account()
      }&startIndex=${cfxsStartIndex}&size=128`,
      {
        // method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCfxsTotalCount(data.count);
        if (data.rows.length > 0 && Array.isArray(data.rows)) {
          setCfxsItems(
            (isReset ? data.rows : cfxsItems.concat(data.rows)).map((c, i) => {
              return {
                id: c.id,
                amount: 1,
                checked: i < maxSelectedItemsCount,
              };
            })
          );
          setCfxsStartIndex(cfxsStartIndex + data.rows.length);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoadingData(false);
      });
  };

  const handleOpenClaimModal = () => {
    document.getElementById("claimModal").showModal();
    setLoadingData(true);
    const ref = window.setTimeout(() => {
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
          setBalance("Failed to get balance, please try again.");
          setLoadingData(false);
        });
      window.clearTimeout(ref);
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

            tx.wait(2)
              .then((txReceipt) => {
                console.log(txReceipt);

                // remove claimed cfxs
                console.log(checkedCfxsItems);
                fetch(`/del`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    owner: account(),
                    id: ids,
                  }),
                })
                  .then((data) => {
                    console.log(data);

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
                    toast("Success: " + txReceipt.hash, {
                      type: "success",
                    });
                  })
                  .catch((err) => {
                    console.error(err);
                    toast(err ? err.message : "Unknown Error", {
                      type: "error",
                    });
                  })
                  .finally(() => {
                    setLoadingClaim(false);
                  });
              })
              .catch((err) => {
                console.error(err);
                toast(err ? err.message : "Unknown Error", { type: "error" });
                setLoadingClaim(false);
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
              i < isHalf ? maxSelectedItemsCount / 2 : maxSelectedItemsCount,
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
      />
    </>
  );
}
