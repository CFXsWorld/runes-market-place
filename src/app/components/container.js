"use client";

import Header from "@/app/components/header";
import Claim from "@/app/components/claim";
import "react-toastify/dist/ReactToastify.css";

export default function Container({ children }) {
  return (
    <div className="min-h-screen container mx-auto text-gray-800 font-light p-3">
      <Header />
      <Claim />
      <div className="text-xs mt-2 text-center text-pink-600">
        Due to asynchronous data indexing, there may be instances where the list data is not updated in time after the transaction is completed. Please be
        patient and wait for the update.
      </div>
      {children}
    </div>
  );
}
