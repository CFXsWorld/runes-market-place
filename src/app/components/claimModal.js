"use client";

import React, { useEffect } from "react";
import { abi as oldCfxsContractAbi, bytecode as oldCfxsContractBytecode } from "@/app/contracts/oldCfxsContractAbi.json";

import * as FluentWallet from "@cfxjs/use-wallet-react/ethereum/Fluent";
import * as MetaMask from "@cfxjs/use-wallet-react/ethereum/MetaMask";
import * as OKXWallet from "@cfxjs/use-wallet-react/ethereum/OKX";
import { maxSelectedItemsCount } from "@/app/utils";

export default function ClaimModal({
  cfxsItems,
  cfxsTotalCount,
  setCfxsItems,
  loadMoreData,
  balance,
  loadingData,
  handleClaim,
  refreshData,
  ToastContainer,
  loadingClaim,
  handleQuickSelected,
  handleClearSelected,
  warningText,
  syncData,
  loadingSync,
}) {
  const isChecked = cfxsItems.some((c) => c.checked);

  const onCheck = (id) => {
    setCfxsItems(
      cfxsItems.map((c) => {
        return c.id === id ? { ...c, checked: !c.checked } : c;
      })
    );
  };

  return (
    <div>
      <dialog id="claimModal" className="modal">
        <div className="modal-box max-w-screen-lg" style={{ minHeight: "96%" }}>
          <ToastContainer style={{ width: "800px", maxWidth: "98%" }} position="top-right" />
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Claim Cfxs</h3>
          <div className="pt-4">
            Old Sum: {loadingData ? <span className="loading loading-spinner loading-xs" /> : <span className="text-primary">{balance}</span>} Claimable:{" "}
            {loadingData ? <span className="loading loading-spinner loading-xs" /> : <span className="text-primary">{cfxsTotalCount}</span>}{" "}
            <span className="text-xs">(Claim up to {maxSelectedItemsCount} each time)</span>
            <button className="btn btn-primary btn-xs ml-4" onClick={() => handleQuickSelected()}>
              Select top {maxSelectedItemsCount}
            </button>
            <button className="btn btn-primary btn-xs ml-2" onClick={() => handleQuickSelected(true)}>
              Select top {maxSelectedItemsCount / 2}
            </button>
            <button className="btn btn-primary btn-xs ml-2" onClick={handleClearSelected}>
              Clear Selected
            </button>
            <button className="btn btn-info btn-xs ml-2" onClick={refreshData}>
              Refresh Data
              {loadingData && <span className="loading loading-spinner loading-sm" />}
            </button>
          </div>
          <div className="py-4">
            <button className="btn btn-primary" onClick={handleClaim} disabled={!isChecked || loadingClaim}>
              {isChecked ? "Claim Cfxs" : "Please check some cfxs"}
              {loadingClaim && <span className="loading loading-spinner" />}
            </button>
            <span className="text-warning ml-2">{warningText}</span>
            <div className="tooltip" data-tip="Click if the data is incorrect">
              <button className="btn btn-accent" onClick={syncData} disabled={loadingClaim || loadingSync}>
                Sync Data
                {loadingClaim && loadingSync && <span className="loading loading-spinner" />}
              </button>
            </div>
          </div>
          <div className="flex flex-row flex-wrap">
            <div>
              {cfxsItems.map((c, i) => (
                <div className="stats shadow rounded-lg m-2 border" key={i}>
                  <div className="stat px-3 py-2">
                    <div className="stat-desc text-xs">#{c.id}</div>
                    <div className="flex items-center">
                      <div className="stat-value mt-1 font-normal text-lg">
                        <span>{c.amount}</span>
                        <span className="font-light text-base"> cfxs</span>
                      </div>
                      <input type="checkbox" checked={c.checked} onChange={() => onCheck(c.id)} className="checkbox checkbox-sm checkbox-primary ml-3" />
                    </div>
                  </div>
                </div>
              ))}
              {cfxsTotalCount > cfxsItems.length && (
                <button className="btn btn-info" onClick={() => loadMoreData()}>
                  Load More
                  {loadingData && <span className="loading loading-spinner loading-sm" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
