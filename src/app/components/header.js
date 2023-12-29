import Link from "next/link";
import ConnectWallet from "@/app/components/connectWallet";

export default function Header() {
  return (
    <div className="navbar bg-neutral px-6 py-6 rounded-2xl shadow-lg flex-col  md:flex-row">
      <div className="navbar-start w-full md:w-6/12">
        <Link href="/" className="font-extralight text-white text-3xl">
          <span className="font-bold">CFXs</span> Marketspace
        </Link>
      </div>
      <div className="navbar-end w-full mt-2 md:w-6/12 md:mt-0">
        <ConnectWallet suppressHydrationWarning />
      </div>
    </div>
  );
}
