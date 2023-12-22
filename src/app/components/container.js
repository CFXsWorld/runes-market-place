"use client";

import Header from "@/app/components/header";
import Claim from "@/app/components/claim";
import "react-toastify/dist/ReactToastify.css";

export default function Container({ children }) {
  return (
    <div className="min-h-screen container mx-auto text-gray-800 font-light p-3">
      <Header />
      <Claim />
      {children}
    </div>
  );
}
