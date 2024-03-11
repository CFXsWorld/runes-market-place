'use client';

import Input from '@/app/components/ui/Input';
import TokenTypeSelector, {
  TOKEN_TYPE,
} from '@/app/(pages)/wormhole/_components/TokenInput/TokenTypeSelector';
import { cn } from '@/app/utils/classnames';
import { Button } from 'flowbite-react';
import CFXsModal from '@/app/(pages)/wormhole/_components/TokenInput/CFXsModal';
import NFTModal from '@/app/(pages)/wormhole/_components/TokenInput/NFTModal';
import useFromInput from '@/app/(pages)/wormhole/_components/TokenInput/useFromInput';

const FromInput = ({ token = {}, tokenList, onTokenChange, loading }) => {
  const {
    openNFT,
    onOpenNFT,
    openCFXs,
    onOpenCFXs,
    disabled,
    coinsBalance,
    onCFSxSelect,
    onNFXSelect,
    onOpenModal,
    onMaxBalance,
    onInputChange,
    onTypeChange,
  } = useFromInput({
    token,
    onTokenChange,
    loading,
  });
  return (
    <div className="w-full flex flex-col px-[20px] py-[16px] max-md:px-[12px] bg-fill-e-primary">
      <div className="text-tc-secondary md:mb-[8px] max-md:mb-[4px] flex-center-between h-[32px]">
        <div className="flex-center">
          <CFXsModal
            onOpen={onOpenCFXs}
            open={openCFXs}
            onSelect={onCFSxSelect}
          />
          <NFTModal onOpen={onOpenNFT} open={openNFT} onSelect={onNFXSelect} />
          <span className="pr-[10px]"> Amount</span>
          {disabled && token.type && (
            <Button
              color="outline"
              className="ml-[10px] max-sm:text-[12px] btn btn-outline btn-primary max-sm:h-[26px] max-sm:min-h-[26px] h-[30px] min-h-[30px] text-[12px] font-normal line-clamp-1 ml-[3px]"
              onClick={onOpenModal}
            >
              Select
            </Button>
          )}
        </div>
        {token.type && token.type !== TOKEN_TYPE.Coin && (
          <div className="flex-center">
            <span className="text-tc-secondary text-[14px] mr-[10px]">
              Total: {token.amount || 0}
            </span>
          </div>
        )}
        {token.type === TOKEN_TYPE.Coin && (
          <div className="flex-center">
            <span className="text-tc-secondary text-[14px] mr-[10px]">
              Balance: {coinsBalance || 0}
            </span>
            <Button
              color="secondary"
              className="text-[12px] h-[24px] bg-fill-separator  font-normal line-clamp-1 ml-[3px] px-0"
              onClick={onMaxBalance}
            >
              MAX
            </Button>
          </div>
        )}
      </div>
      <div className="flex-center-between">
        <Input
          type="text"
          disabled={disabled}
          value={token.balance}
          className={cn(
            'flex-1 border-none outline-none bg-transparent',
            'focus:border-transparent focus:ring-transparent text-[24px] text-white disabled:text-white',
            { 'bg-transparent': disabled }
          )}
          placeholder="0"
          onChange={onInputChange}
        />
        <div>
          <TokenTypeSelector
            value={token.type}
            options={tokenList}
            onChange={onTypeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FromInput;
