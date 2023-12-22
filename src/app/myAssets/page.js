"use client";

import React, { useEffect, useState } from "react";
import * as FluentWallet from "@cfxjs/use-wallet-react/ethereum/Fluent";
import * as MetaMask from "@cfxjs/use-wallet-react/ethereum/MetaMask";
import * as OKXWallet from "@cfxjs/use-wallet-react/ethereum/OKX";
import {
  bridgeContractAddress,
  isCorrectChainId,
  maxSelectedItemsCount,
  newContractAddress,
  oldContractAddress,
} from "@/app/utils";
import { BrowserProvider, Contract, getAddress } from "ethers";
import { abi as oldCfxsContractAbi } from "@/app/contracts/oldCfxsContractAbi.json";
import { abi as newCfxsContractAbi } from "@/app/contracts/newCfxsContractAbi.json";
import { abi as bridgeContractAbi } from "@/app/contracts/bridgeContractMainnet.json"; //prod
import { toast, ToastContainer } from "react-toastify";

export default function Page() {
  const fluentWalletStatus = FluentWallet.useStatus();
  const fluentWalletAccount = FluentWallet.useAccount();
  const fluentWalletChainId = FluentWallet.useChainId();
  const metaMaskWalletStatus = MetaMask.useStatus();
  const metaMaskWalletAccount = MetaMask.useAccount();
  const metaMaskWalletChainId = MetaMask.useChainId();
  const okxWalletStatus = OKXWallet.useStatus();
  const okxWalletAccount = OKXWallet.useAccount();
  const okxWalletChainId = OKXWallet.useChainId();

  const [activeTab, setActiveTab] = useState(0);
  const [oldBalance, setOldBalance] = useState("");
  const [newBalance, setNewBalance] = useState("");
  const [loadingOldData, setLoadingOldData] = useState(false);
  const [loadingNewData, setLoadingNewData] = useState(false);
  const [oldCfxsTotalCount, setOldCfxsTotalCount] = React.useState(0);
  const [oldCfxsStartIndex, setOldCfxsStartIndex] = React.useState(0);
  const [oldCfxsItems, setOldCfxsItems] = React.useState([]);
  const [newCfxsTotalCount, setNewCfxsTotalCount] = React.useState(0);
  const [newCfxsStartIndex, setNewCfxsStartIndex] = React.useState(0);
  const [newCfxsItems, setNewCfxsItems] = React.useState([]);
  const [warningOldText, setWarningOldText] = React.useState("");
  const [warningNewText, setWarningNewText] = React.useState("");

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
    : globalThis.ethereum;

  const provider = new BrowserProvider(browserProvier);
  const oldContract = new Contract(
    oldContractAddress,
    oldCfxsContractAbi,
    provider
  );
  const newContract = new Contract(
    newContractAddress,
    newCfxsContractAbi,
    provider
  );
  const bridgeContract = new Contract(
    bridgeContractAddress,
    bridgeContractAbi,
    provider
  );

  const loadMoreOldData = (isReset) => {
    if (account()) {
      setLoadingOldData(true);
      return fetch(
        `/getCfxsList?owner=${getAddress(
          account()
        )}&startIndex=${oldCfxsStartIndex}&size=128`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setOldCfxsTotalCount(data.count);
          if (data.rows.length > 0 && Array.isArray(data.rows)) {
            setOldCfxsItems(
              isReset ? data.rows : oldCfxsItems.concat(data.rows)
            );
            setOldCfxsStartIndex(oldCfxsStartIndex + data.rows.length);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoadingOldData(false);
        });
    }
  };

  const loadMoreNewData = (isReset) => {
    if (account()) {
      setLoadingNewData(true);
      return fetch(
        `/getCfxsNewList?owner=${getAddress(
          account()
        )}&startIndex=${newCfxsStartIndex}&size=128`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setNewCfxsTotalCount(data.count);
          if (data.rows.length > 0 && Array.isArray(data.rows)) {
            setNewCfxsItems(
              isReset ? data.rows : newCfxsItems.concat(data.rows)
            );
            setNewCfxsStartIndex(newCfxsStartIndex + data.rows.length);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoadingNewData(false);
        });
    }
  };

  const getOldCfxsBalance = () => {
    if (account()) {
      setLoadingOldData(true);
      setWarningOldText("");
      oldContract
        .balanceOf(account())
        .then((balance) => {
          console.log("getOldCfxsBalance", balance);
          setOldBalance(balance + "");
          if (balance > 0) {
            console.log("get old items");
            loadMoreOldData(true);
            setLoadingOldData(false);
          } else {
            setLoadingOldData(false);
          }
        })
        .catch((err) => {
          console.error(err);
          toast(err ? err.message : "Unknown Error", { type: "error" });
          setWarningOldText("Failed to get balance, please retry.");
          setLoadingOldData(false);
        });
    }
  };

  const getNewCfxsBalance = () => {
    if (account()) {
      setLoadingNewData(true);
      setWarningNewText("");
      newContract
        .balanceOf(account())
        .then((balance) => {
          console.log("getNewCfxsBalance", balance);
          setNewBalance(balance + "");
          if (balance > 0) {
            console.log("get new items");
            loadMoreNewData(true);
          } else {
            setLoadingNewData(false);
          }
        })
        .catch((err) => {
          console.error(err);
          toast(err ? err.message : "Unknown Error", { type: "error" });
          setWarningNewText("Failed to get balance, please retry.");
          setLoadingNewData(false);
        });
    }
  };

  useEffect(() => {
    getOldCfxsBalance();
    getNewCfxsBalance();
  }, []);

  const tabTitleClassName = (tabIndex) =>
    `inline-flex items-center h-10 px-4 -mb-px text-xl text-center bg-transparent border-b-2 whitespace-nowrap focus:outline-none ${
      activeTab === tabIndex
        ? "text-indigo-600 border-blue-500"
        : "text-gray-600 border-transparent hover:border-blue-500 hover:text-indigo-600"
    }`;

  return (
    <div className="mt-4">
      <h1 className="text-2xl ml-2">My Assets</h1>
      <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-300 whitespace-nowrap px-4 pt-4">
        <button
          className={tabTitleClassName(0)}
          onClick={() => setActiveTab(0)}
        >
          Old Cfxs
        </button>
        <button
          className={tabTitleClassName(1)}
          onClick={() => setActiveTab(1)}
        >
          New Cfxs
        </button>
      </div>
      {activeTab === 0 && (
        <div className="px-4 py-4 text-lg">
          <div className="pt-2">
            Old Cfxs Contract Balance:{" "}
            {loadingOldData ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <span className="text-primary">{oldBalance}</span>
            )}
            <span className="text-warning ml-2">{warningOldText}</span>
            <button
              className="btn btn-info btn-xs ml-2"
              onClick={getOldCfxsBalance}
            >
              Refresh Data
              {loadingOldData && (
                <span className="loading loading-spinner loading-sm" />
              )}
            </button>
          </div>
          <div className="flex flex-row flex-wrap mt-2">
            <div>
              {oldCfxsItems.map((c, i) => (
                <div className="stats shadow rounded-lg m-2 border" key={i}>
                  <div className="stat px-3 py-2">
                    <div className="stat-desc text-xs">#{c.id}</div>
                    <div className="flex items-center">
                      <div className="stat-value mt-1 font-normal text-lg">
                        <span>{c.amount}</span>
                        <span className="font-light text-base"> cfxs</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                {oldCfxsTotalCount > oldCfxsItems.length && (
                  <button
                    className="btn btn-info ml-2"
                    onClick={() => loadMoreOldData()}
                  >
                    Load More
                    {loadingOldData && (
                      <span className="loading loading-spinner loading-sm" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === 1 && (
        <div className="px-4 py-4 text-lg">
          <div className="pt-2">
            New Cfxs Contract Balance:{" "}
            {loadingNewData ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <span className="text-primary">{newBalance}</span>
            )}
            <span className="text-warning ml-2">{warningNewText}</span>
            <button
              className="btn btn-info btn-xs ml-2"
              onClick={getNewCfxsBalance}
            >
              Refresh Data
              {loadingNewData && (
                <span className="loading loading-spinner loading-sm" />
              )}
            </button>
          </div>
          <div className="flex flex-row flex-wrap mt-2">
            <div>
              {newCfxsItems.map((c, i) => (
                <div className="stats shadow rounded-lg m-2 border" key={i}>
                  <div className="stat px-3 py-2">
                    <div className="stat-desc text-xs">#{c.id}</div>
                    <div className="flex items-center">
                      <div className="stat-value mt-1 font-normal text-lg">
                        <span>{c.amount}</span>
                        <span className="font-light text-base"> cfxs</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                {newCfxsTotalCount > newCfxsItems.length && (
                  <button
                    className="btn btn-info ml-2"
                    onClick={() => loadMoreNewData()}
                  >
                    Load More
                    {loadingNewData && (
                      <span className="loading loading-spinner loading-sm" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
