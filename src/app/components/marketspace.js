"use client";

import React from "react";

export default function Marketspace() {
  // const [activeTab, setActiveTab] = React.useState("tab1");
  //
  // const handleTabChange = (value) => {
  //   setActiveTab(value);
  // };

  return (
    <div className="mt-4">
      <h1 className="text-2xl ml-2">Marketspace</h1>
      <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-300 whitespace-nowrap px-4 pt-4">
        <button className="inline-flex items-center h-10 px-4 -mb-px text-xl text-center text-indigo-600 bg-transparent border-b-2 border-blue-500 whitespace-nowrap focus:outline-none">
          Listed
        </button>

        {/*<button className="inline-flex items-center h-10 px-4 -mb-px text-base text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">*/}
        {/*  Account*/}
        {/*</button>*/}
      </div>

      <div className="px-4 py-6 text-lg">Coming soon ...</div>
    </div>
  );
}
