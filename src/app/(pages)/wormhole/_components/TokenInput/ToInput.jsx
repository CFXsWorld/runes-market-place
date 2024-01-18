'use client';

import Input from '@/app/components/ui/Input';
import TokenTypeSelector, {
  TOKEN_TYPE,
} from '@/app/(pages)/wormhole/_components/TokenInput/TokenTypeSelector';
import { cn } from '@/app/utils/classnames';

const TokenInput = ({ token = {}, tokenList, onTokenChange }) => {
  return (
    <div className="w-full flex flex-col px-[20px] py-[16px] max-md:px-[12px] bg-fill-e-primary">
      <div className="text-tc-secondary md:mb-[8px] max-md:mb-[4px] flex-center-between h-[32px]">
        <div className="flex-center">
          <span className="pr-[10px]"> Will Receive</span>
        </div>
        {token.type && token.type === 'NFT' && (
          <div className="flex-center">
            <span className="text-tc-secondary text-[14px] mr-[10px]">
              Coins: {token.amount || 0}
            </span>
          </div>
        )}
      </div>
      <div className="flex-center-between">
        <Input
          type="text"
          disabled
          value={token.type === TOKEN_TYPE.Coin ? token.amount : token.balance}
          className={cn(
            'flex-1 border-none outline-none bg-transparent',
            'focus:border-transparent focus:ring-transparent text-[24px] text-white disabled:text-white',
            { 'bg-transparent': true }
          )}
          placeholder="0"
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
