import Link from "next/link";
import ConnectWallet from "@/app/components/connectWallet";

export default function Header() {
  return (
    <div className="navbar bg-neutral px-6 py-6 rounded-2xl shadow-lg">
      <div className="navbar-start">
        <Link href="/" className="text-3xl font-extralight text-white">
          <span className="font-bold">Cfxs</span> Marketspace
        </Link>
      </div>
      <div className="navbar-end">
        <ConnectWallet suppressHydrationWarning />
      </div>
    </div>
  );
}
