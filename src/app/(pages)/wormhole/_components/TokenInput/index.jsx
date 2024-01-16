'use client';

import Input from '@/app/components/ui/Input';
import TokenTypeSelector from '@/app/(pages)/wormhole/_components/TokenInput/TokenTypeSelector';
import { cn } from '@/app/utils/classnames';
import useTokenInput from '@/app/(pages)/wormhole/_components/TokenInput/useTokenInput';
import { Button } from 'flowbite-react';
import CFXsModal from '@/app/(pages)/wormhole/_components/TokenInput/CFXsModal';
import NFTModal from '@/app/(pages)/wormhole/_components/TokenInput/NFTModal';

const TokenInput = ({
  label,
  token = {},
  tokenList,
  onTokenChange,
  type = 'FROM',
                      loading,
}) => {
  const {
    openNFT,
    onOpenNFT,
    openCFXs,
    onOpenCFXs,
    disabled,
    showSelect,
    showBalance,
    coinsBalance,
  } = useTokenInput({
    type,
    token,
    onTokenChange,
    loading,
  });
  return (
    <div className="w-full flex flex-col px-[20px] py-[16px] max-md:px-[12px] bg-fill-e-primary">
      <div className="text-tc-secondary md:mb-[8px] max-md:mb-[4px] flex-center-between h-[32px]">
        <div className="flex-center">
          <span className="pr-[10px]"> {label}</span>
          {showSelect && (
            <>
              <CFXsModal
                onOpen={onOpenCFXs}
                open={openCFXs}
                onSelect={(items) => {
                  onTokenChange({ ...token, amount: items.length, items });
                  onOpenCFXs(false);
                }}
              />
              <NFTModal
                onOpen={onOpenNFT}
                open={openNFT}
                onSelect={(items) => {
                  onTokenChange({ ...token, amount: items.length, items });
                  onOpenNFT(false);
                }}
              />
              <Button
                color="outline"
                className="ml-[10px] max-sm:text-[12px] btn btn-outline btn-primary max-sm:h-[26px] max-sm:min-h-[26px] h-[30px] min-h-[30px] text-[12px] font-normal line-clamp-1 ml-[3px]"
                onClick={() => {
                  if (token?.type === 'NFT') {
                    onOpenNFT(true);
                  }
                  if (token?.type === 'CFXs') {
                    onOpenCFXs(true);
                  }
                }}
              >
                Select
              </Button>
            </>
          )}
        </div>
        {showBalance && (
          <div className="flex-center">
            <span className="text-tc-secondary text-[14px] mr-[10px]">
              Balance: {coinsBalance}
            </span>
            <Button
              color="secondary"
              className="text-[12px] h-[24px] bg-fill-separator  font-normal line-clamp-1 ml-[3px] px-0"
              onClick={() => {
                onTokenChange({ ...token, amount: coinsBalance });
              }}
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
          value={token.amount}
          className={cn(
            'flex-1 border-none outline-none bg-transparent',
            'focus:border-transparent focus:ring-transparent text-[24px] text-white disabled:text-white',
            { 'bg-transparent': disabled }
          )}
          placeholder="0"
          onChange={(value) => {
            if (/^\d+$/g.test(value) || !value) {
              onTokenChange({ ...token, amount: value });
            }
          }}
        />
        <div>
          <TokenTypeSelector
            value={token.type}
            options={tokenList}
            onChange={(v) => {
              onTokenChange({ ...token, type: v });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TokenInput;
