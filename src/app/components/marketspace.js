"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import * as DefaultWallet from "@cfxjs/use-wallet-react/ethereum";
import * as FluentWallet from "@cfxjs/use-wallet-react/ethereum/Fluent";
import * as MetaMask from "@cfxjs/use-wallet-react/ethereum/MetaMask";
import * as OKXWallet from "@cfxjs/use-wallet-react/ethereum/OKX";
import { addressFormat, defaultLockHours, isCorrectChainId, maxTransferSelectedItemsCount, pageItemCount, usdtDecimal } from "@/app/utils";
import { BrowserProvider, Contract, getAddress, isAddress, formatUnits, parseUnits } from "ethers";
import { abi as oldCfxsContractAbi } from "@/app/contracts/oldCfxsContractAbi.json";
import { abi as newCfxsContractAbi } from "@/app/contracts/newCfxsContractAbi.json";
import { abi as bridgeContractAbi } from "@/app/contracts/bridgeContractMainnet.json";
import { abiMulticall as usdtAbi } from "@/app/contracts/usdt.json";
import { toast, ToastContainer } from "react-toastify";
import dayjs from "dayjs";

const globalThis = typeof window !== "undefined" ? window : {};

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
  const [listedUSDTAmount, setListedUSDTAmount] = React.useState(0);
  const [warningListedText, setWarningListedText] = React.useState("");
  const [loadingList, setLoadingList] = React.useState(false);
  const [isUSDTApproved, setIsUSDTApproved] = React.useState(false);
  const [orderTotalAmount, setOrderTotalAmount] = React.useState(0);
  const [loadingApprove, setLoadingApprove] = React.useState(false);
  const [usdtBalance, setUsdtBalance] = React.useState(0);

  // filter and order
  const [amountOrder, setAmountOrder] = React.useState(0); // 0 asc  1 desc
  const [amountRangeStart, setAmountRangeStart] = React.useState("0");
  const [amountRangeEnd, setAmountRangeEnd] = React.useState("");

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
  const usdtContract = new Contract(process.env.NEXT_PUBLIC_USDTContractAddress, usdtAbi, provider);

  const getListedItems = (currentPage, isReset, params) => {
    if (account()) {
      setLoadingListedData(true);
      getTotalVolume();
      getUsdtBalance();
      if (isReset) {
        setListedCfxsItems(() => []);
        setListedCfxsTotalCount(() => 0);
        setListedCfxsCurrentPage(() => 1);
      }

      fetch(
        `/${process.env.NEXT_PUBLIC_IsTest === "true" ? "getMarketspaceCfxsTest" : "getMarketspaceCfxs"}?startIndex=${
          isReset ? 0 : (currentPage - 1) * pageItemCount
        }&size=${pageItemCount}&ao=${amountOrder}&amountRangeStart=${amountRangeStart}&amountRangeEnd=${amountRangeEnd}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setListedCfxsTotalCount(data.count || 0);
          if (data.rows && data.rows.length > 0 && Array.isArray(data.rows)) {
            setListedCfxsItems(
              data.rows.map((c, i) => {
                return {
                  id: c.id,
                  amount: c.amount,
                  checked: false,
                  locktime: c.locktime,
                  seller: c.chainto,
                  isMine: c.chainto.toLowerCase() === account().toLowerCase(),
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

  const getTotalVolume = () => {
    if (account()) {
      newContract
        .sumOfUSD(0)
        .then((amount) => {
          console.log("sumOfUSD", amount);
          setListedUSDTAmount(Math.ceil(formatUnits(amount, usdtDecimal)));
        })
        .catch((err) => {
          console.error(err);
          // toast(err ? err.message : "Unknown Error", { type: "error" });
        });
    }
  };

  const getUsdtBalance = () => {
    if (account()) {
      usdtContract
        .balanceOf(account())
        .then((amount) => {
          console.log("USDT Balance", amount);
          setUsdtBalance(Math.ceil(formatUnits(amount, usdtDecimal)));
        })
        .catch((err) => {
          console.error(err);
          // toast(err ? err.message : "Unknown Error", { type: "error" });
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

  const handleBuy = () => {
    if (account()) {
      // should USDT Approved
      usdtContract
        .allowance(account(), process.env.NEXT_PUBLIC_NewContractAddress)
        .then((value) => {
          const checkedCfxsItems = listedCfxsItems.filter((c) => c.checked);
          const ids = checkedCfxsItems.map((c) => c.id);
          const tokenTypes = checkedCfxsItems.map((c) => 0);
          const amounts = checkedCfxsItems.map((c) => parseUnits(c.amount, 18));
          const totalAmount = amounts.reduce((a, b) => BigInt(a) + BigInt(b));
          console.log("totalAmount", totalAmount);
          setOrderTotalAmount(totalAmount);
          if (!value || BigInt(value) < BigInt(totalAmount)) {
            document.getElementById("approveModal").showModal();
            return;
          }

          setLoadingBuy(true);
          setWarningListedText("");
          provider.getSigner().then((signer) => {
            const contractWithSigner = newContract.connect(signer);
            contractWithSigner
              .UnlockingScriptbatch(ids, tokenTypes, amounts)
              .then((tx) => {
                console.log(tx);

                setWarningListedText("Please wait for the transaction and do not close the window.");

                tx.wait()
                  .then((txReceipt) => {
                    console.log(txReceipt);
                    toast("Success: " + txReceipt.hash, {
                      type: "success",
                    });
                    getListedItems(listedCfxCurrentPage, false);
                  })
                  .catch((err) => {
                    console.error(err);
                    toast(err ? err.message : "Unknown Error", { type: "error" });
                  })
                  .finally(() => {
                    setLoadingBuy(false);
                    setWarningListedText("");
                  });
              })
              .catch((err) => {
                console.error(err);
                toast(err ? err.message : "Unknown Error", { type: "error" });
                setLoadingBuy(false);
                setWarningListedText("");
              });
          });
        })
        .catch((err) => {
          console.error(err);
          toast(err ? err.message : "Unknown Error", { type: "error" });
        });
    } else {
      toast("Invalid Address", { type: "error" });
    }
  };

  const handleApprove = (isMax) => {
    if (account()) {
      setLoadingApprove(true);
      setWarningListedText("");
      usdtContract.balanceOf(account()).then((balance) => {
        if (!balance || BigInt(balance) < BigInt(orderTotalAmount)) {
          document.getElementById("approveModal").close();
          toast("Insufficient USDT Balance", { type: "error" });
          setLoadingApprove(false);
        } else {
          provider
            .getSigner()
            .then((signer) => {
              const contractWithSigner = usdtContract.connect(signer);
              contractWithSigner
                .approve(process.env.NEXT_PUBLIC_NewContractAddress, isMax === true ? balance : orderTotalAmount)
                .then((tx) => {
                  console.log(tx);

                  setWarningListedText("Please wait for the transaction and do not close the window.");

                  tx.wait()
                    .then((txReceipt) => {
                      console.log(txReceipt);
                      toast("Success: " + txReceipt.hash, {
                        type: "success",
                      });
                      document.getElementById("approveModal").close();
                    })
                    .catch((err) => {
                      console.error(err);
                      toast(err ? err.message : "Unknown Error", { type: "error" });
                    })
                    .finally(() => {
                      setLoadingApprove(false);
                      setWarningListedText("");
                    });
                })
                .catch((err) => {
                  console.error(err);
                  toast(err ? err.message : "Unknown Error", { type: "error" });
                  setLoadingApprove(false);
                });
            })
            .catch((err) => {
              console.error(err);
              toast(err ? err.message : "Unknown Error", { type: "error" });
              setLoadingApprove(false);
            });
        }
      });
    } else {
      toast("Invalid Address", { type: "error" });
    }
  };

  useEffect(() => {
    getListedItems(1, true);
  }, [defaultWalletAccount, fluentWalletAccount, metaMaskWalletAccount, okxWalletAccount]);

  const refreshWithOrder = () => {
    getListedItems(listedCfxCurrentPage, false);
  };

  const Pagination = () => (
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
  );

  return (
    <div className="mt-4">
      <h1 className="text-2xl ml-2 font-bold flex justify-between items-center">
        Marketspace
        <Link href="/myAssets" className="btn btn-primary btn-sm text-md">
          View My Assets
        </Link>
      </h1>
      <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-300 whitespace-nowrap px-4 pt-4">
        <button className="inline-flex items-center h-10 px-4 -mb-px text-xl text-center text-indigo-600 bg-transparent border-b-2 border-blue-500 whitespace-nowrap focus:outline-none">
          Listed
        </button>
      </div>

      <div className="px-4 py-6 text-lg">
        <div>
          <div className="stats shadow">
            <div className="stat place-items-center">
              <div className="stat-title">Listed</div>
              <div className="stat-value text-primary">{loadingListedData ? <span className="loading loading-spinner" /> : listedCfxsTotalCount}</div>
              <div className="stat-desc">CFXs</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Total Volume</div>
              <div className="stat-value text-primary">{listedUSDTAmount}</div>
              <div className="stat-desc">USDT</div>
            </div>
          </div>
        </div>
        <div className="text-wrap whitespace-normal break-all mt-2">
          <span className="text-warning">{warningListedText}</span>
          {loadingBuy && <span className="loading loading-spinner loading-sm ml-2" />}
        </div>
        <div className="pt-2 mt-2 flex justify-between items-center max-w-full">
          <div>
            <div className="tooltip" data-tip="Refresh current page data">
              <button className="btn btn-info btn-sm" onClick={() => getListedItems(listedCfxCurrentPage, false)}>
                Refresh
                {loadingListedData && <span className="loading loading-spinner loading-sm" />}
              </button>
            </div>
            <div className="tooltip" data-tip="Reload the data">
              <button className="btn btn-info btn-sm ml-1 md:ml-2" onClick={() => getListedItems(1, true)}>
                Reload
                {loadingListedData && <span className="loading loading-spinner loading-sm" />}
              </button>
            </div>
            <span className="ml-1 md:ml-2 text-xs">
              My USDT Balance: <span className="text-primary">{usdtBalance}</span>
            </span>
          </div>
          <div className="dropdown dropdown-end dropdown-top fixDropdown md:dropdown-bottom">
            <div tabIndex={0} role="button" className="btn btn-primary btn-sm ">
              Menu
              <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5073" width="20" height="20">
                <path d="M170.666667 213.333333m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#ffffff" p-id="5074" />
                <path d="M170.666667 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#ffffff" p-id="5075" />
                <path d="M170.666667 810.666667m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#ffffff" p-id="5076" />
                <path
                  d="M896 778.666667H362.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h533.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM362.666667 245.333333h533.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H362.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32zM896 480H362.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h533.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"
                  fill="#ffffff"
                  p-id="5077"
                />
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              {/*<li>*/}
              {/*  <a onClick={() => handleClearSelected("listed")}>Price Asc</a>*/}
              {/*</li>*/}
              {/*<li>*/}
              {/*  <a onClick={() => handleClearSelected("listed")}>Price Desc</a>*/}
              {/*</li>*/}
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
        <div className="pt-2 mt-2 flex justify-start items-center text-sm max-w-full md:ml-2">
          <span>Price</span>
          <button className={`btn btn-xs ml-1 ${amountOrder === 0 ? "btn-active" : ""}`} onClick={() => setAmountOrder(0)}>
            Asc
          </button>
          <button className={`btn btn-xs ml-1 ${amountOrder === 1 ? "btn-active" : ""}`} onClick={() => setAmountOrder(1)}>
            Desc
          </button>
          <input
            type="text"
            placeholder="Min"
            className="input input-bordered input-sm ml-1 w-14"
            value={amountRangeStart}
            onChange={(e) => setAmountRangeStart(e.target.value)}
          />
          <span> ~ </span>
          <input
            type="text"
            placeholder="Max"
            className="input input-bordered input-sm w-14"
            value={amountRangeEnd}
            onChange={(e) => setAmountRangeEnd(e.target.value)}
          />
          <button className={`btn btn-info btn-xs ml-1 ${amountOrder === 1 ? "btn-active" : ""}`} onClick={refreshWithOrder}>
            Go
            {loadingListedData && <span className="loading loading-spinner loading-xs" />}
          </button>
        </div>
        <div className="flex flex-row flex-wrap mt-4">
          <div>
            {listedCfxsItems.map((c, i) => (
              <div className="stats shadow rounded-lg m-1 w-36 border md:m-2 md:w-44" key={i}>
                <div className="stat px-2 py-2">
                  <div className="stat-desc text-xs">#{c.id}</div>
                  <div className="flex items-center justify-between">
                    <div className="stat-value mt-1 font-normal text-lg">
                      <span>{c.amount}</span>
                      <span className="font-light text-sm"> USDT</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={c.checked}
                      onChange={() => onListedCfxsCheck(c.id)}
                      className="checkbox checkbox-sm checkbox-primary ml-3"
                    />
                  </div>
                  <div className="stat-desc text-xs mt-1">Lock to: {c.locktime ? dayjs.unix(c.locktime).format("MM-DD HH:mm") : ""}</div>
                  <div className={`stat-desc text-xs mt-1 ${c.isMine ? "text-success" : ""}`}>Listed by {c.isMine ? "me" : addressFormat(c.seller)}</div>
                </div>
              </div>
            ))}
          </div>
          <Pagination />
        </div>
      </div>
      <dialog id="approveModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">USDT Approve</h3>
          <p className="py-4">Please approve USDT before buying CFXs.</p>
          <div className="modal-action">
            <button className="btn btn-primary" disabled={loadingApprove} onClick={() => handleApprove(false)}>
              Approve this Order
              {loadingApprove && <span className="loading loading-spinner ml-2" />}
            </button>
            <button className="btn btn-primary ml-2" disabled={loadingApprove} onClick={() => handleApprove(true)}>
              Approve Max
              {loadingApprove && <span className="loading loading-spinner ml-2" />}
            </button>
          </div>
        </div>
      </dialog>
      {/*<ToastContainer style={{ width: "800px", maxWidth: "98%" }} position="top-right" />*/}
    </div>
  );
}
