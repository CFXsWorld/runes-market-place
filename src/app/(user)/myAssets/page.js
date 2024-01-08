"use client";

import React, { useEffect, useState } from "react";
import * as DefaultWallet from "@cfxjs/use-wallet-react/ethereum";
import * as FluentWallet from "@cfxjs/use-wallet-react/ethereum/Fluent";
import * as MetaMask from "@cfxjs/use-wallet-react/ethereum/MetaMask";
import * as OKXWallet from "@cfxjs/use-wallet-react/ethereum/OKX";
import { addressFormat, defaultLockHours, isCorrectChainId, maxTransferSelectedItemsCount, pageItemCount, usdtDecimal } from "@/app/utils";
import { BrowserProvider, Contract, getAddress, isAddress, parseUnits } from "ethers";
import { abi as oldCfxsContractAbi } from "@/app/contracts/oldCfxsContractAbi.json";
import { abi as newCfxsContractAbi } from "@/app/contracts/newCfxsContractAbi.json";
import { abi as bridgeContractAbi } from "@/app/contracts/bridgeContractMainnet.json";
import { abiMulticall as multiCallContractAbi } from "@/app/contracts/Multicall.json";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import dayjs from "dayjs";

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
  const [loadingListedData, setLoadingListedData] = useState(false);
  const [oldCfxsTotalCount, setOldCfxsTotalCount] = React.useState(0);
  const [oldCfxsStartIndex, setOldCfxsStartIndex] = React.useState(0);
  const [oldCfxsItems, setOldCfxsItems] = React.useState([]);
  const [newCfxsTotalCount, setNewCfxsTotalCount] = React.useState(0);
  const [newCfxsCurrentPage, setNewCfxsCurrentPage] = React.useState(1);
  const [newCfxsItems, setNewCfxsItems] = React.useState([]);
  const [listedCfxsTotalCount, setListedCfxsTotalCount] = React.useState(0);
  const [listedCfxCurrentPage, setListedCfxsCurrentPage] = React.useState(1);
  const [listedCfxsItems, setListedCfxsItems] = React.useState([]);
  const [warningOldText, setWarningOldText] = React.useState("");
  const [warningNewText, setWarningNewText] = React.useState("");
  const [warningListedText, setWarningListedText] = React.useState("");
  const [loadingTransfer, setLoadingTransfer] = React.useState(false);
  const [loadingList, setLoadingList] = React.useState(false);
  const [loadingUnLock, setLoadingUnLock] = React.useState(false);
  const [transferToAddress, setTransferToAddress] = React.useState("");
  const [toBeListedCfxsItems, setToBeListedCfxsItems] = React.useState([]);

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
  const multiCallContract = new Contract(process.env.NEXT_PUBLIC_MultiCallContractAddress, multiCallContractAbi, provider);

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

  const loadMoreNewData = (currentPage, isReset) => {
    if (account()) {
      setLoadingNewData(true);
      if (isReset) {
        setNewCfxsItems(() => []);
        setNewCfxsTotalCount(() => 0);
        setNewCfxsCurrentPage(() => 0);
      }
      fetch(
        `/${process.env.NEXT_PUBLIC_IsTest === "true" ? "getCfxsNewListTest" : "getCfxsNewList"}?owner=${getAddress(account())}&startIndex=${
          isReset ? 0 : (currentPage - 1) * pageItemCount
        }&size=${pageItemCount}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setNewCfxsTotalCount(data.count);
          if (data.rows.length > 0 && Array.isArray(data.rows)) {
            setNewCfxsItems(
              data.rows.map((c, i) => {
                return {
                  id: c.id,
                  amount: 1,
                  checked: false,
                  locked: false,
                };
              })
            );
            setNewCfxsCurrentPage(currentPage);

            // multicall get locked status
            // let calls = [];
            // data.rows.map((c) => {
            //   calls.push({
            //     target: process.env.NEXT_PUBLIC_NewContractAddress,
            //     callData: newContract.interface.encodeFunctionData("getLockStates", [c.id]),
            //   });
            // });
            //
            // provider.getSigner().then((signer) => {
            //   const contractWithSigner = multiCallContract.connect(signer);
            //   contractWithSigner.aggregate(calls).then((data) => {
            //     console.log(data);
            //     // setNewCfxsItems with lock status
            //   });
            // });

            // batch rpc
            let calls = [];
            data.rows.map((c) => {
              calls.push(newContract.getLockStates(c.id));
            });
            Promise.all(calls)
              .then((states) => {
                console.log(states);
                if (states && states.length === data.rows.length) {
                  setNewCfxsItems(
                    data.rows.map((c, i) => {
                      return {
                        id: c.id,
                        amount: 1,
                        checked: false,
                        locked: states[i],
                      };
                    })
                  );
                } else {
                  toast("Get Lock Status Error", { type: "error" });
                }
              })
              .catch((err) => {
                console.error(err);
                toast(err ? err.message : "Unknown Error", { type: "error" });
              });
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

  const getNewCfxsBalance = (currentPage, isReset) => {
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
            loadMoreNewData(currentPage, isReset);
          } else {
            setLoadingNewData(false);
          }
        })
        .catch((err) => {
          console.error(err);
          // toast(err ? err.message : "Unknown Error", { type: "error" });
          setWarningNewText("Failed to get balance, please retry.");
          setLoadingNewData(false);
        });
    }
  };

  const getListedItems = (currentPage, isReset) => {
    if (account()) {
      setLoadingListedData(true);
      if (isReset) {
        setListedCfxsItems(() => []);
        setListedCfxsTotalCount(() => 0);
        setListedCfxsCurrentPage(() => 1);
      }
      fetch(
        `/${process.env.NEXT_PUBLIC_IsTest === "true" ? "getMyListedCfxsTest" : "getMyListedCfxs"}?owner=${getAddress(account())}&startIndex=${
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

  useEffect(() => {
    // getOldCfxsBalance();
    getNewCfxsBalance(1, true);
    // getListedItems();
  }, [defaultWalletAccount, fluentWalletAccount, metaMaskWalletAccount, okxWalletAccount]);

  const tabTitleClassName = (tabIndex) =>
    `inline-flex items-center h-10 px-4 -mb-px text-base text-center bg-transparent border-b-2 whitespace-nowrap md:text-xl focus:outline-none ${
      activeTab === tabIndex ? "text-indigo-600 border-blue-500" : "text-gray-600 border-transparent hover:border-blue-500 hover:text-indigo-600"
    }`;

  // quick select top items
  const handleQuickSelected = (isHalf, type) => {
    if (type === "listed") {
      if (listedCfxsItems.length > 0)
        setListedCfxsItems(
          listedCfxsItems.map((c, i) => {
            return {
              ...c,
              checked: i < (isHalf === true ? maxTransferSelectedItemsCount / 2 : maxTransferSelectedItemsCount),
            };
          })
        );
    } else if (type === "noLock") {
      let count = 0;
      if (newCfxsItems.length > 0)
        setNewCfxsItems(
          newCfxsItems.map((c, i) => {
            let isChecked = count < (isHalf ? maxTransferSelectedItemsCount / 2 : maxTransferSelectedItemsCount) && !c.locked;
            if (isChecked) count++;
            return {
              ...c,
              checked: isChecked,
            };
          })
        );
    } else {
      if (newCfxsItems.length > 0)
        setNewCfxsItems(
          newCfxsItems.map((c, i) => {
            return {
              ...c,
              checked: i < (isHalf ? maxTransferSelectedItemsCount / 2 : maxTransferSelectedItemsCount),
            };
          })
        );
    }
  };

  const handleClearSelected = (type) => {
    if (type === "listed") {
      setListedCfxsItems(
        listedCfxsItems.map((c) => {
          return { ...c, checked: false };
        })
      );
    } else {
      setNewCfxsItems(
        newCfxsItems.map((c) => {
          return { ...c, checked: false };
        })
      );
    }
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
      const checkedCfxsItems = newCfxsItems.filter((c) => c.checked);
      const ids = checkedCfxsItems.map((c) => c.id);
      setLoadingTransfer(true);
      provider.getSigner().then((signer) => {
        const contractWithSigner = newContract.connect(signer);
        contractWithSigner["transfer(uint256[], address)"](ids, transferToAddress)
          .then((tx) => {
            console.log(tx);
            document.getElementById("transferModal").close();

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

            tx.wait()
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
            document.getElementById("transferModal").close();
          });
      });
    } else {
      toast("Invalid Address", { type: "error" });
    }
  };

  const openListModal = () => {
    const checkedCfxsItems = newCfxsItems.filter((c) => c.checked);
    if (checkedCfxsItems.length > 0) {
      if (checkedCfxsItems.some((c) => c.locked)) {
        toast("Some Locked CFXs have been selected", { type: "error" });
      } else {
        setToBeListedCfxsItems(() =>
          checkedCfxsItems.map((c) => ({
            ...c,
            tokenType: "0",
            amount: "", //TODO
          }))
        );
        document.getElementById("listModal").showModal();
      }
    } else {
      toast("No CFXs have been selected", { type: "error" });
    }
  };

  const onListFormChange = (index, field, value) => {
    setToBeListedCfxsItems(() =>
      toBeListedCfxsItems.map((c, i) => {
        if (i === index) {
          if (field === "tokenType") c.tokenType = value;
          if (field === "amount") c.amount = value || 0;
        }
        return c;
      })
    );
  };

  const isListFormValid = () => {
    return !toBeListedCfxsItems.some((c) => c.amount === "" || c.amount < 0 || c.tokenType !== "0");
  };

  const handleList = () => {
    if (isListFormValid()) {
      const ids = toBeListedCfxsItems.map((c) => c.id);
      const tokenTypes = toBeListedCfxsItems.map((c) => +c.tokenType);
      const amounts = toBeListedCfxsItems.map((c) => parseUnits(c.amount, usdtDecimal));
      setLoadingList(true);
      provider.getSigner().then((signer) => {
        const contractWithSigner = newContract.connect(signer);
        contractWithSigner
          .LockingScriptbatch(ids, tokenTypes, amounts, defaultLockHours)
          .then((tx) => {
            console.log(tx);

            document.getElementById("listModal").close();
            setWarningNewText("Please wait for the transaction and do not close the window.");

            tx.wait()
              .then((txReceipt) => {
                console.log(txReceipt);
                toast("Success: " + txReceipt.hash, {
                  type: "success",
                });
                setToBeListedCfxsItems([]);
              })
              .catch((err) => {
                console.error(err);
                setNewCfxsItems(oldNewCfxsItems);
                setNewCfxsTotalCount(_newCfxsTotalCount);
                toast(err ? err.message : "Unknown Error", { type: "error" });
              })
              .finally(() => {
                setLoadingList(false);
                setWarningNewText("");
              });
          })
          .catch((err) => {
            console.error(err);
            toast(err ? err.message : "Unknown Error", { type: "error" });
            setLoadingList(false);
            document.getElementById("listModal").close();
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

  const onListedCfxsCheck = (id) => {
    setListedCfxsItems(
      listedCfxsItems.map((c) => {
        return c.id === id ? { ...c, checked: !c.checked } : c;
      })
    );
  };

  const handleUnList = () => {
    if (account()) {
      const checkedCfxsItems = listedCfxsItems.filter((c) => c.checked);
      const ids = checkedCfxsItems.map((c) => c.id);
      if (ids.length === 1) {
        setLoadingUnLock(true);
        provider.getSigner().then((signer) => {
          const contractWithSigner = newContract.connect(signer);
          contractWithSigner
            .OwnerUnlockingScript(ids[0])
            .then((tx) => {
              console.log(tx);
              document.getElementById("transferModal").close();

              setWarningNewText("Please wait for the transaction and do not close the window.");

              // remove claimed cfxs from UI
              const oldListedCfxsItems = [...listedCfxsItems];
              const _listedCfxsTotalCount = listedCfxsTotalCount;
              setListedCfxsItems(
                listedCfxsItems
                  .filter((c) => !ids.includes(c.id))
                  .map((c, i) => {
                    return {
                      ...c,
                      checked: false,
                    };
                  })
              );
              setListedCfxsTotalCount(_listedCfxsTotalCount - ids.length);

              tx.wait()
                .then((txReceipt) => {
                  console.log(txReceipt);
                  toast("Success: " + txReceipt.hash, {
                    type: "success",
                  });
                })
                .catch((err) => {
                  console.error(err);
                  setListedCfxsItems(oldListedCfxsItems);
                  setListedCfxsTotalCount(_listedCfxsTotalCount);
                  toast(err ? err.message : "Unknown Error", { type: "error" });
                })
                .finally(() => {
                  setLoadingUnLock(false);
                  setWarningNewText("");
                });
            })
            .catch((err) => {
              console.error(err);
              toast(err ? err.message : "Unknown Error", { type: "error" });
              setLoadingUnLock(false);
            });
        });
      } else {
        toast("Only one CFXs can be unlocked at a time", { type: "error" });
      }
    } else {
      toast("Invalid Address", { type: "error" });
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl ml-2 font-bold flex justify-between items-center">
        My Assets
        <Link href="/" className="btn btn-primary btn-sm text-md">
          View Marketspace
        </Link>
      </h1>
      <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-300 whitespace-nowrap px-4 pt-4">
        <button className={tabTitleClassName(0)} onClick={() => setActiveTab(0)}>
          Owned
        </button>
        <button className={tabTitleClassName(1)} onClick={() => setActiveTab(1)}>
          Listed
        </button>
        <button className={tabTitleClassName(2)} onClick={() => setActiveTab(2)}>
          Old CFXs
        </button>
      </div>
      {activeTab === 0 && (
        <div className="px-4 py-4 text-lg">
          <div className="text-wrap whitespace-normal break-all">
            <span className="text-warning">{warningNewText}</span>{" "}
            {(loadingList || loadingTransfer) && <span className="loading loading-spinner loading-sm ml-2" />}
          </div>
          <div className="pt-2 flex justify-between items-center max-w-full">
            <div className="flex justify-between items-center">
              <div>
                Balance: {loadingNewData ? <span className="loading loading-spinner loading-xs" /> : <span className="text-primary">{newBalance}</span>}{" "}
                {loadingTransfer && <span className="loading loading-spinner loading-sm ml-2" />}
              </div>
              <div>
                <div className="tooltip" data-tip="Refresh current page data">
                  <button className="btn btn-info btn-sm ml-2" onClick={() => getNewCfxsBalance(newCfxsCurrentPage, false)}>
                    Refresh
                    {loadingNewData && <span className="loading loading-spinner loading-sm" />}
                  </button>
                </div>
                <div className="tooltip" data-tip="Reload the data">
                  <button className="btn btn-info btn-sm ml-2" onClick={() => getNewCfxsBalance(1, true)}>
                    Reload
                    {loadingNewData && <span className="loading loading-spinner loading-sm" />}
                  </button>
                </div>
              </div>
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
                <li>
                  <a onClick={() => handleQuickSelected(false)}>Select top {maxTransferSelectedItemsCount} CFXs</a>
                </li>
                <li>
                  <a onClick={() => handleQuickSelected(true)}>Select top {maxTransferSelectedItemsCount / 2} CFXs</a>
                </li>
                <li>
                  <a onClick={() => handleQuickSelected(false, "noLock")}>Select top {maxTransferSelectedItemsCount} No Lock</a>
                </li>
                <li>
                  <a onClick={() => handleQuickSelected(true, "noLock")}>Select top {maxTransferSelectedItemsCount / 2} No Lock</a>
                </li>
                <li>
                  <a onClick={() => handleClearSelected()}>Clear Selected</a>
                </li>
                <li>
                  <a className="font-bold" onClick={openTransferModal}>
                    Transfer {loadingTransfer && <span className="loading loading-spinner loading-sm" />}
                  </a>
                </li>
                <li>
                  <a className="font-bold" onClick={openListModal}>
                    List on Marketspace {loadingList && <span className="loading loading-spinner loading-sm" />}
                    {/*<span className="text-xs">(coming soon)</span>*/}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-row flex-wrap mt-4">
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
                    <div className={`stat-desc mt-1 ${c.locked ? "text-info" : "text-success"}`}>{c.locked ? "Locked" : "No Lock"}</div>
                  </div>
                </div>
              ))}
              <div>
                {Math.ceil(newCfxsTotalCount / pageItemCount) > 1 && (
                  <div className="join mt-4">
                    {[...Array(Math.ceil(newCfxsTotalCount / pageItemCount))].map((c, i) =>
                      i < 2 || i > Math.ceil(newCfxsTotalCount / pageItemCount) - 3 || Math.abs(newCfxsCurrentPage - i - 1) < 3 ? (
                        <button
                          className={`join-item btn btn-sm ${newCfxsCurrentPage === i + 1 ? "btn-active" : ""}`}
                          key={i}
                          onClick={() => (newCfxsCurrentPage === i + 1 ? "" : loadMoreNewData(i + 1))}
                        >
                          {i + 1}
                        </button>
                      ) : Math.abs(newCfxsCurrentPage - i - 1) === 3 ? (
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
        </div>
      )}
      {activeTab === 1 && (
        <div className="px-4 py-4 text-lg">
          <div className="text-wrap whitespace-normal break-all">
            <span className="text-warning">{warningListedText}</span>
          </div>
          <div className="pt-2 flex justify-between items-center max-w-full">
            <div className="flex flex-col justify-between items-center md:flex-row">
              <div>
                Listed CFXs:{" "}
                {loadingListedData ? <span className="loading loading-spinner loading-xs" /> : <span className="text-primary">{listedCfxsTotalCount}</span>}{" "}
                {loadingUnLock && <span className="loading loading-spinner loading-sm ml-2" />}
              </div>
              <div className="tooltip" data-tip="Refresh current page data">
                <button className="btn btn-info btn-sm ml-2" onClick={() => getListedItems(listedCfxCurrentPage, false)}>
                  Refresh
                  {loadingListedData && <span className="loading loading-spinner loading-sm" />}
                </button>
              </div>
              <div className="tooltip" data-tip="Reload the data">
                <button className="btn btn-info btn-sm ml-2" onClick={() => getListedItems(1, true)}>
                  Reload
                  {loadingListedData && <span className="loading loading-spinner loading-sm" />}
                </button>
              </div>
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
                <li>
                  <a onClick={() => handleClearSelected("listed")}>Clear Selected</a>
                </li>
                <li>
                  <a className="font-bold" onClick={handleUnList}>
                    UnList(UnLock) {loadingUnLock && <span className="loading loading-spinner loading-sm" />}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-row flex-wrap mt-4">
            <div>
              {listedCfxsItems.map((c, i) => (
                <div className="stats shadow rounded-lg m-1 border w-36 md:m-2 md:w-44" key={i}>
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
                  </div>
                </div>
              ))}
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
        </div>
      )}
      {activeTab === 2 && (
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
            <button className="btn btn-primary" disabled={!(transferToAddress && isAddress(transferToAddress)) || loadingTransfer} onClick={handleTransfer}>
              {!(transferToAddress && isAddress(transferToAddress)) ? "Please fill in the correct address" : "Transfer"}
              {loadingTransfer && <span className="loading loading-spinner loading-sm ml-2" />}
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="listModal" className="modal">
        <div className="modal-box max-w-screen-lg">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">List CFXs</h3>
          <p className="py-4">Please select currency and enter sales amount</p>
          <div className="flex flex-wrap">
            {toBeListedCfxsItems.map((c, i) => (
              <div className="card card-side border mt-2 mr-1 md:mr-2" key={i}>
                <div className="card-body p-3">
                  <div className="stat-desc text-xs">#{c.id}</div>
                  <div className="flex items-center text-xs">
                    {/*<input*/}
                    {/*  type="radio"*/}
                    {/*  value="0"*/}
                    {/*  className="radio"*/}
                    {/*  checked={c.tokenType === "0"}*/}
                    {/*  onChange={(e) => onListFormChange(i, "tokenType", e.target.value)}*/}
                    {/*/>*/}
                    {/*<span className="ml-1 md:ml-2">USDT</span>*/}
                    {/*<input*/}
                    {/*  type="radio"*/}
                    {/*  value="1"*/}
                    {/*  className="radio ml-1 md:ml-2"*/}
                    {/*  checked={c.tokenType === "1"}*/}
                    {/*  onChange={(e) => onListFormChange(i, "tokenType", e.target.value)}*/}
                    {/*/>*/}
                    {/*<span className="ml-1 md:ml-2">USDC</span>*/}
                    <input
                      type="number"
                      placeholder="Amount..."
                      className="input input-bordered w-20 input-sm ml-1 md:ml-2 md:w-28"
                      value={c.amount}
                      onChange={(e) => onListFormChange(i, "amount", e.target.value)}
                    />
                    <span className="ml-1 md:ml-2">USDT</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleList} disabled={!isListFormValid() || loadingList}>
              {isListFormValid() ? "List" : "Please fill out the form correctly"}
              {loadingList && <span className="loading loading-spinner loading-sm ml-2" />}
            </button>
          </div>
        </div>
      </dialog>
      <ToastContainer style={{ width: "800px", maxWidth: "98%" }} position="top-right" />
    </div>
  );
}