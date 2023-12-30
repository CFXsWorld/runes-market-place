"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as DefaultWallet from "@cfxjs/use-wallet-react/ethereum";
import * as FluentWallet from "@cfxjs/use-wallet-react/ethereum/Fluent";
import * as MetaMask from "@cfxjs/use-wallet-react/ethereum/MetaMask";
import * as OKXWallet from "@cfxjs/use-wallet-react/ethereum/OKX";
import { defaultLockHours, isCorrectChainId, maxTransferSelectedItemsCount, pageItemCount } from "@/app/utils";
import { BrowserProvider, Contract, getAddress, isAddress } from "ethers";
import { abi as oldCfxsContractAbi } from "@/app/contracts/oldCfxsContractAbi.json";
import { abi as newCfxsContractAbi } from "@/app/contracts/newCfxsContractAbi.json";
import { abi as bridgeContractAbi } from "@/app/contracts/bridgeContractMainnet.json"; //prod
import { toast, ToastContainer } from "react-toastify";

export default function Marketspace() {
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
  const [loadingListedData, setLoadingListedData] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [listedCfxsTotalCount, setListedCfxsTotalCount] = React.useState(0);
  const [listedCfxCurrentPage, setListedCfxsCurrentPage] = React.useState(1);
  const [listedCfxsItems, setListedCfxsItems] = React.useState([]);
  const [warningListedText, setWarningListedText] = React.useState("");
  const [loadingList, setLoadingList] = React.useState(false);

  const account = () => defaultWalletAccount || fluentWalletAccount || metaMaskWalletAccount || okxWalletAccount;

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
  const oldContract = new Contract(process.env.NEXT_PUBLIC_OldContractAddress, oldCfxsContractAbi, provider);
  const newContract = new Contract(process.env.NEXT_PUBLIC_NewContractAddress, newCfxsContractAbi, provider);
  const bridgeContract = new Contract(process.env.NEXT_PUBLIC_BridgeContractAddress, bridgeContractAbi, provider);

  const getListedItems = (currentPage, isReset) => {
    if (account()) {
      setLoadingListedData(true);
      if (isReset) {
        setListedCfxsItems(() => []);
        setListedCfxsTotalCount(() => 0);
        setListedCfxsCurrentPage(() => 1);
      }
      // TODO
      fetch(
        `/${process.env.NEXT_PUBLIC_IsTest === "true" ? "getCfxsNewListTest" : "getCfxsNewList"}?owner=${getAddress(account())}&startIndex=${
          isReset ? 0 : (currentPage - 1) * pageItemCount
        }&size=${pageItemCount}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setListedCfxsTotalCount(data.count);
          if (data.rows.length > 0 && Array.isArray(data.rows)) {
            setListedCfxsItems(
              data.rows.map((c, i) => {
                return {
                  id: c.id,
                  // TODO
                  amount: 1,
                  checked: false,
                };
              })
            );
            setListedCfxsCurrentPage(currentPage);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoadingListedData(false);
        });
    }
  };

  // quick select top items
  const handleQuickSelected = (isHalf) => {
    if (listedCfxsItems.length > 0)
      setListedCfxsItems(
        listedCfxsItems.map((c, i) => {
          return {
            ...c,
            checked: i < (isHalf === true ? maxTransferSelectedItemsCount / 2 : maxTransferSelectedItemsCount),
          };
        })
      );
  };

  const handleClearSelected = () => {
    setListedCfxsItems(
      listedCfxsItems.map((c) => {
        return { ...c, checked: false };
      })
    );
  };

  const onListedCfxsCheck = (id) => {
    setListedCfxsItems(
      listedCfxsItems.map((c) => {
        return c.id === id ? { ...c, checked: !c.checked } : c;
      })
    );
  };

  const handleBuy = () => {};

  return (
    <div className="mt-4">
      <h1 className="text-2xl ml-2 font-bold flex justify-between items-center">
        Marketspace
        <Link href="/myAssets" className="text-base font-light text-primary  hover:underline">
          Go to My Assets
        </Link>
      </h1>
      <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-300 whitespace-nowrap px-4 pt-4">
        <button className="inline-flex items-center h-10 px-4 -mb-px text-xl text-center text-indigo-600 bg-transparent border-b-2 border-blue-500 whitespace-nowrap focus:outline-none">
          Listed
        </button>
      </div>

      <div className="px-4 py-6 text-lg">
        <div className="text-wrap whitespace-normal break-all">
          <span className="text-warning">{warningListedText}</span>
        </div>
        <div className="pt-2 flex justify-between items-center max-w-full">
          <div className="flex flex-col justify-between items-center md:flex-row">
            <div>
              Listed CFXs:{" "}
              {loadingListedData ? <span className="loading loading-spinner loading-xs" /> : <span className="text-primary">{listedCfxsTotalCount}</span>}
            </div>
            <div>
              <button className="btn btn-info btn-sm md:ml-2" onClick={() => getListedItems(1, true)}>
                Refresh Data
                {loadingListedData && <span className="loading loading-spinner loading-sm" />}
              </button>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-primary btn-sm ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a onClick={() => handleQuickSelected(false, "listed")}>Select top {maxTransferSelectedItemsCount}</a>
              </li>
              <li>
                <a onClick={() => handleQuickSelected(true, "listed")}>Select top {maxTransferSelectedItemsCount / 2}</a>
              </li>
              <li>
                <a onClick={() => handleClearSelected("listed")}>Clear Selected</a>
              </li>
              <li>
                <a className="font-bold" onClick={handleBuy}>
                  Buy {loadingBuy && <span className="loading loading-spinner loading-sm" />}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row flex-wrap mt-4">
          <div>
            {listedCfxsItems.map((c, i) => (
              <div className="stats shadow rounded-lg m-1 border md:m-2" key={i}>
                <div className="stat px-2 py-2">
                  <div className="stat-desc text-xs">#{c.id}</div>
                  <div className="flex items-center">
                    <div className="stat-value mt-1 font-normal text-lg">
                      <span>{c.amount}</span>
                      <span className="font-light text-base"> CFXs</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={c.checked}
                      onChange={() => onListedCfxsCheck(c.id)}
                      className="checkbox checkbox-sm checkbox-primary ml-3"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          {Math.ceil(listedCfxsTotalCount / pageItemCount) > 1 && (
            <div className="join mt-4">
              {[...Array(Math.ceil(listedCfxsTotalCount / pageItemCount))].map((c, i) =>
                i < 2 || i > Math.ceil(listedCfxsTotalCount / pageItemCount) - 3 || Math.abs(listedCfxCurrentPage - i - 1) < 3 ? (
                  <button
                    className={`join-item btn btn-sm ${listedCfxCurrentPage === i + 1 ? "btn-active" : ""}`}
                    key={i}
                    onClick={() => (listedCfxCurrentPage === i + 1 ? "" : getListedItems(i + 1))}
                  >
                    {i + 1}
                  </button>
                ) : Math.abs(listedCfxCurrentPage - i - 1) === 3 ? (
                  <button className="join-item btn btn-sm btn-disabled" key={i}>
                    ...
                  </button>
                ) : (
                  ""
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
