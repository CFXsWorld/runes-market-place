'use client';


import useEnv from "@/app/hooks/useEnv";
import { toast } from "react-toastify";
import { cn } from "@/app/utils/classnames";
import { ESpaceIcon } from "@/app/components/icons";


 const ChainInfo = ({ chainId, status, switchChain }) => {
  const { correctChainId, correctChainIdHex } = useEnv();
  const isActive = status === 'active';
  const isCorrectChain = correctChainId === chainId;

  const switchNetwork = async () => {
    try {
      if (chainId !== correctChainId) {
        await switchChain(correctChainIdHex);
      }
    } catch (switchError) {
      if (switchError.code === 4902) {
        toast.error('The chain has not been added to Wallet!');
      }
    }
  };

  return (
    isActive && (
      <div
        className={cn(
          'md:h-[48px] flex-center md:py-[12px] md:px-[20px] md:mr-[20px] md:rounded-[4px] md:bg-fill-e-secondary max-md:mr-[5px]',
          !isCorrectChain && 'cursor-pointer md:bg-status-error-non-opaque'
        )}
        onClick={switchNetwork}
      >
        {isCorrectChain ? (
          <>
            <ESpaceIcon className="mr-[5px]" />
            <span className="max-md:hidden">eSpace</span>
          </>
        ) : (
          <span className="text-status-error text-[14px]">
            Switch <span className="max-md:hidden">NetWork</span>
          </span>
        )}
      </div>
    )
  );
};
 export  default ChainInfo