"use client";

import React from "react";

export default function ClaimModal() {
  const [cfxsItemsCount, setCfxsItemsCount] = React.useState(50);
  const [cfxsItems, setCfxsItems] = React.useState(
    [...Array(cfxsItemsCount).keys()].map((i) => ({
      id: i,
      amount: 1,
      checked: false,
    }))
  );

  const isChecked = cfxsItems.some((c) => c.checked);

  const onCheck = (id) => {
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
        return { ...c, checked: i < 24 };
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

  const claimCfxs = () => {
    console.log("claim");
  };

  return (
    <div>
      <dialog id="claimModal" className="modal">
        <div className="modal-box max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Claim Cfxs</h3>
          <div className="pt-4">
            Claimable: <span className="text-primary">30</span> (Claim up to 24
            each time)
            <button
              className="btn btn-primary btn-xs ml-4"
              onClick={handleQuickSelected}
            >
              Select top 24
            </button>
            <button className="btn btn-xs ml-2" onClick={handleClearSelected}>
              Clear
            </button>
          </div>
          <div className="py-4">
            <button
              className="btn btn-primary"
              onClick={claimCfxs}
              disabled={!isChecked}
            >
              {isChecked ? "Claim Cfxs" : "Please check some cfxs"}
            </button>
          </div>
          <div className="flex flex-row flex-wrap">
            {cfxsItems.map((c, i) => (
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
            ))}
          </div>
        </div>
      </dialog>
    </div>
  );
}
