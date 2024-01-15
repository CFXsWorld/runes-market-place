'use client';
import { ArrowDownLineIcon, DocsIcon } from '@/app/components/icons';
import DocsModal from '@/app/(pages)/wormhole/_components/Transform/DocsModal';
import useTransform from '@/app/(pages)/wormhole/_components/Transform/useTransform';
import TokenInput from '@/app/(pages)/wormhole/_components/TokenInput';
import Fee from '@/app/(pages)/wormhole/_components/Fee';
import { Button } from 'flowbite-react';
import { tokenList } from '@/app/(pages)/wormhole/_components/TokenInput/TokenTypeSelector';

const Transform = () => {
  const { open, onOpen, fromToken, setFromToken, toToken, setToToken } =
    useTransform();
  return (
    <div className="flex flex-col">
      <DocsModal open={open} onOpen={onOpen} />
      <div className="flex-center-between">
        <span>Transform</span>
        <DocsIcon
          className="cursor-pointer"
          onClick={() => {
            onOpen(true);
          }}
        />
      </div>
      <div className="flex flex-col mt-[24px] gap-[16px] relative">
        <TokenInput
          label="Amount"
          type="FROM"
          token={fromToken}
          tokenList={tokenList.map((token) => ({
            ...token,
            disabled: toToken.type === token.value,
          }))}
          onTokenChange={setFromToken}
        />
        <div className="h-[42px] absolute-center bg-fill-e-secondary w-[42px] border-[1px] border-black rounded-[4px] flex-center">
          <ArrowDownLineIcon />
        </div>
        <TokenInput
          label="Will Receive"
          type="TO"
          token={toToken}
          tokenList={tokenList.map((token) => ({
            ...token,
            disabled: fromToken.type === token.value,
          }))}
          onTokenChange={setToToken}
        />
      </div>
      <Fee />
      <Button className="w-full mt-[42px]" color="primary" disabled>
        CONFIRM TRANSFORM
      </Button>
    </div>
  );
};

export default Transform;
