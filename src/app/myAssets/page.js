"use client";

import React, { useEffect, useState } from "react";
import * as DefaultWallet from "@cfxjs/use-wallet-react/ethereum";
import * as FluentWallet from "@cfxjs/use-wallet-react/ethereum/Fluent";
import * as MetaMask from "@cfxjs/use-wallet-react/ethereum/MetaMask";
import * as OKXWallet from "@cfxjs/use-wallet-react/ethereum/OKX";
import { isCorrectChainId, maxTransferSelectedItemsCount, pageItemCount } from "@/app/utils";
import { BrowserProvider, Contract, getAddress, isAddress } from "ethers";
import { abi as oldCfxsContractAbi } from "@/app/contracts/oldCfxsContractAbi.json";
import { abi as newCfxsContractAbi } from "@/app/contracts/newCfxsContractAbi.json";
import { abi as bridgeContractAbi } from "@/app/contracts/bridgeContractMainnet.json"; //prod
import { toast, ToastContainer } from "react-toastify";

export default function Page() {
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
  const [loadingTransfer, setLoadingTransfer] = React.useState(false);
  const [transferToAddress, setTransferToAddress] = React.useState("");

  const account = () => defaultWalletAccount || fluentWalletAccount || metaMaskWalletAccount || okxWalletAccount;

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
  const oldContract = new Contract(process.env.NEXT_PUBLIC_OldContractAddress, oldCfxsContractAbi, provider);
  const newContract = new Contract(process.env.NEXT_PUBLIC_NewContractAddress, newCfxsContractAbi, provider);
  const bridgeContract = new Contract(process.env.NEXT_PUBLIC_BridgeContractAddress, bridgeContractAbi, provider);

  const loadMoreOldData = (isReset) => {
    if (account()) {
      setLoadingOldData(true);
      if (isReset) {
        setOldCfxsItems(() => []);
        setOldCfxsTotalCount(() => 0);
        setOldCfxsStartIndex(() => 0);
      }
      return fetch(
        `/${process.env.NEXT_PUBLIC_IsTest === "true" ? "getCfxsListTest" : "getCfxsList"}?owner=${getAddress(account())}&startIndex=${
          isReset ? 0 : oldCfxsStartIndex
        }&size=${pageItemCount}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setOldCfxsTotalCount(data.count);
          if (data.rows.length > 0 && Array.isArray(data.rows)) {
            setOldCfxsItems(isReset ? data.rows : oldCfxsItems.concat(data.rows));
            setOldCfxsStartIndex((isReset ? 0 : oldCfxsStartIndex) + data.rows.length);
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
      if (isReset) {
        setNewCfxsItems(() => []);
        setNewCfxsTotalCount(() => 0);
        setNewCfxsStartIndex(() => 0);
      }
      fetch(
        `/${process.env.NEXT_PUBLIC_IsTest === "true" ? "getCfxsNewListTest" : "getCfxsNewList"}?owner=${getAddress(account())}&startIndex=${
          isReset ? 0 : newCfxsStartIndex
        }&size=${pageItemCount}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setNewCfxsTotalCount(data.count);
          if (data.rows.length > 0 && Array.isArray(data.rows)) {
            setNewCfxsItems(
              (isReset ? data.rows : newCfxsItems.concat(data.rows)).map((c, i) => {
                return {
                  id: c.id,
                  amount: 1,
                  checked: false,
                };
              })
            );
            setNewCfxsStartIndex((isReset ? 0 : newCfxsStartIndex) + data.rows.length);
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
  }, [defaultWalletAccount, fluentWalletAccount, metaMaskWalletAccount, okxWalletAccount]);

  const tabTitleClassName = (tabIndex) =>
    `inline-flex items-center h-10 px-4 -mb-px text-xl text-center bg-transparent border-b-2 whitespace-nowrap focus:outline-none ${
      activeTab === tabIndex ? "text-indigo-600 border-blue-500" : "text-gray-600 border-transparent hover:border-blue-500 hover:text-indigo-600"
    }`;

  // quick select top items
  const handleQuickSelected = (isHalf) => {
    if (newCfxsItems.length > 0)
      setNewCfxsItems(
        newCfxsItems.map((c, i) => {
          return {
            ...c,
            checked: i < (isHalf ? maxTransferSelectedItemsCount / 2 : maxTransferSelectedItemsCount),
          };
        })
      );
  };

  const handleClearSelected = () => {
    setNewCfxsItems(
      newCfxsItems.map((c) => {
        return { ...c, checked: false };
      })
    );
  };

  const openTransferModal = () => {
    const checkedCfxsItems = newCfxsItems.filter((c) => c.checked);
    if (checkedCfxsItems.length > 0) {
      document.getElementById("transferModal").showModal();
    } else {
      toast("No CFXs have been selected", { type: "error" });
    }
  };

  const handleTransfer = () => {
    if (transferToAddress && isAddress(transferToAddress)) {
      document.getElementById("transferModal").close();
      const checkedCfxsItems = newCfxsItems.filter((c) => c.checked);
      const ids = checkedCfxsItems.map((c) => c.id);
      setLoadingTransfer(true);
      provider.getSigner().then((signer) => {
        const contractWithSigner = newContract.connect(signer);
        contractWithSigner["transfer(uint256[], address)"](ids, transferToAddress)
          .then((tx) => {
            console.log(tx);

            setWarningNewText("Please wait for the transaction and do not close the window.");

            // remove claimed cfxs from UI
            const oldNewCfxsItems = [...newCfxsItems];
            const _newCfxsTotalCount = newCfxsTotalCount;
            setNewCfxsItems(
              newCfxsItems
                .filter((c) => !ids.includes(c.id))
                .map((c, i) => {
                  return {
                    ...c,
                    checked: false,
                  };
                })
            );
            setNewCfxsTotalCount(_newCfxsTotalCount - ids.length);

            tx.wait(2)
              .then((txReceipt) => {
                console.log(txReceipt);
                toast("Success: " + txReceipt.hash, {
                  type: "success",
                });
              })
              .catch((err) => {
                console.error(err);
                setNewCfxsItems(oldNewCfxsItems);
                setNewCfxsTotalCount(_newCfxsTotalCount);
                toast(err ? err.message : "Unknown Error", { type: "error" });
              })
              .finally(() => {
                setLoadingTransfer(false);
                setWarningNewText("");
              });
          })
          .catch((err) => {
            console.error(err);
            toast(err ? err.message : "Unknown Error", { type: "error" });
            setLoadingTransfer(false);
          });
      });
    } else {
      toast("Invalid Address", { type: "error" });
    }
  };

  const onNewCfxsCheck = (id) => {
    setNewCfxsItems(
      newCfxsItems.map((c) => {
        return c.id === id ? { ...c, checked: !c.checked } : c;
      })
    );
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl ml-2">My Assets</h1>
      <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-300 whitespace-nowrap px-4 pt-4">
        <button className={tabTitleClassName(0)} onClick={() => setActiveTab(0)}>
          New CFXs
        </button>
        <button className={tabTitleClassName(1)} onClick={() => setActiveTab(1)}>
          Old CFXs
        </button>
      </div>
      {activeTab === 0 && (
        <div className="px-4 py-4 text-lg">
          <div className="text-wrap whitespace-normal break-all">
            <span className="text-warning">{warningNewText}</span>
          </div>
          <div className="pt-2 flex justify-between items-center max-w-full">
            <div className="flex flex-col justify-between items-start md:flex-row">
              <div>
                Balance: {loadingNewData ? <span className="loading loading-spinner loading-xs" /> : <span className="text-primary">{newBalance}</span>}{" "}
                {loadingTransfer && <span className="loading loading-spinner loading-sm ml-2" />}
              </div>
              <div>
                <button className="btn btn-info btn-xs md:ml-2" onClick={getNewCfxsBalance}>
                  Refresh Data
                  {loadingNewData && <span className="loading loading-spinner loading-sm" />}
                </button>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-primary btn-md">
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
                  <a onClick={() => handleQuickSelected()}>Select top {maxTransferSelectedItemsCount}</a>
                </li>
                <li>
                  <a onClick={() => handleQuickSelected(true)}>Select top {maxTransferSelectedItemsCount / 2}</a>
                </li>
                <li>
                  <a onClick={handleClearSelected}>Clear Selected</a>
                </li>
                <li>
                  <a className="font-bold" onClick={openTransferModal}>
                    Transfer {loadingTransfer && <span className="loading loading-spinner loading-sm" />}
                  </a>
                </li>
                {/*<li>*/}
                {/*  <a className="flex flex-col items-start">*/}
                {/*    <span>List on Marketspace</span>*/}
                {/*    <span className="text-xs">(coming soon)</span>*/}
                {/*  </a>*/}
                {/*</li>*/}
              </ul>
            </div>
          </div>
          <div className="flex flex-row flex-wrap mt-2">
            <div>
              {newCfxsItems.map((c, i) => (
                <div className="stats shadow rounded-lg m-1 border md:m-2" key={i}>
                  <div className="stat px-2 py-2">
                    <div className="stat-desc text-xs">#{c.id}</div>
                    <div className="flex items-center">
                      <div className="stat-value mt-1 font-normal text-lg">
                        <span>{c.amount}</span>
                        <span className="font-light text-base"> CFXs</span>
                      </div>
                      <input type="checkbox" checked={c.checked} onChange={() => onNewCfxsCheck(c.id)} className="checkbox checkbox-sm checkbox-primary ml-3" />
                    </div>
                  </div>
                </div>
              ))}
              <div>
                {newCfxsTotalCount > newCfxsItems.length && (
                  <button className="btn btn-info ml-2" onClick={() => loadMoreNewData()}>
                    Load More
                    {loadingNewData && <span className="loading loading-spinner loading-sm" />}
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
            Old Sum: {loadingOldData ? <span className="loading loading-spinner loading-xs" /> : <span className="text-primary">{oldBalance}</span>} Claimable:{" "}
            {loadingOldData ? <span className="loading loading-spinner loading-xs" /> : <span className="text-primary">{oldCfxsTotalCount}</span>}{" "}
            <span className="text-warning ml-2">{warningOldText}</span>
            <button className="btn btn-info btn-xs ml-2" onClick={getOldCfxsBalance}>
              Refresh Data
              {loadingOldData && <span className="loading loading-spinner loading-sm" />}
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
                        <span className="font-light text-base"> CFXs</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                {oldCfxsTotalCount > oldCfxsItems.length && (
                  <button className="btn btn-info ml-2" onClick={() => loadMoreOldData()}>
                    Load More
                    {loadingOldData && <span className="loading loading-spinner loading-sm" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <dialog id="transferModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Transfer CFXs</h3>
          <p className="py-4">Please enter transfer destination address:</p>
          <input
            type="text"
            placeholder="To Address 0x..."
            className="input input-bordered w-full"
            value={transferToAddress}
            onChange={(e) => setTransferToAddress(e.target.value)}
          />
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleTransfer}>
              Transfer
            </button>
          </div>
        </div>
      </dialog>
      <ToastContainer style={{ width: "800px", maxWidth: "98%" }} position="top-right" />
    </div>
  );
}
