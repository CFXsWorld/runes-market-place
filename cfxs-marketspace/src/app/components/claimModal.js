"use client";

import React, { useEffect } from "react";
import {
  abi as oldCfxsContractAbi,
  bytecode as oldCfxsContractBytecode,
} from "@/app/contracts/oldCfxsContractAbi.json";

import * as FluentWallet from "@cfxjs/use-wallet-react/ethereum/Fluent";
import * as MetaMask from "@cfxjs/use-wallet-react/ethereum/MetaMask";
import * as OKXWallet from "@cfxjs/use-wallet-react/ethereum/OKX";
import { maxSelectedItemsCount, oldContractAddress } from "@/app/utils";

export default function ClaimModal({
  cfxsItems,
  setCfxsItems,
  balance,
  loadingData,
  handleClaim,
  refreshData,
  ToastContainer,
}) {
  const isChecked = cfxsItems.some((c) => c.checked);

  const onCheck = (id) => {
    console.log(provider);
    setCfxsItems(
      cfxsItems.map((c) => {
        return c.id === id ? { ...c, checked: !c.checked } : c;
      })
    );
  };

  // quick select top 24 items
  const handleQuickSelected = () => {
    setCfxsItems(
      cfxsItems.map((c, i) => {
        return { ...c, checked: i < maxSelectedItemsCount };
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
    <div>
      <dialog id="claimModal" className="modal">
        <div className="toast">
          <div className="alert alert-info">
            <span>New message arrived.</span>
          </div>
        </div>
        <div className="modal-box max-w-5xl">
          <ToastContainer />
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Claim Cfxs</h3>
          <div className="pt-4">
            Claimable:{" "}
            {loadingData ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <span className="text-primary">{balance}</span>
            )}{" "}
            (Claim up to {maxSelectedItemsCount} each time)
            <button
              className="btn btn-primary btn-xs ml-4"
              onClick={handleQuickSelected}
            >
              Select top {maxSelectedItemsCount}
            </button>
            <button className="btn btn-xs ml-2" onClick={handleClearSelected}>
              Clear
            </button>
            <button className="btn btn-info btn-xs ml-2" onClick={refreshData}>
              Refresh Data
            </button>
          </div>
          <div className="py-4">
            <button
              className="btn btn-primary"
              onClick={handleClaim}
              disabled={!isChecked}
            >
              {isChecked ? "Claim Cfxs" : "Please check some cfxs"}
            </button>
          </div>
          <div className="flex flex-row flex-wrap">
            {loadingData ? (
              <span className="loading loading-spinner loading-lg"></span>
            ) : (
              cfxsItems.map((c, i) => (
                <div className="stats shadow rounded-lg m-2 border" key={i}>
                  <div className="stat px-4 py-3">
                    <div className="stat-desc">#{c.id}</div>
                    <div className="stat-value mt-1 px-2 font-normal">
                      {c.amount}
                      <span className="font-light text-lg"> cfxs</span>
                    </div>
                    <div className="stat-figure text-primary">
                      <input
                        type="checkbox"
                        checked={c.checked}
                        onChange={() => onCheck(c.id)}
                        className="checkbox checkbox-sm checkbox-primary"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
