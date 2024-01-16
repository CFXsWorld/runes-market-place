'use client';

import {
  ArrowDownLineIcon,
  DocsIcon,
  LoadingIcon,
} from '@/app/components/icons';
import DocsModal from '@/app/(pages)/wormhole/_components/Transform/DocsModal';
import useTransform from '@/app/(pages)/wormhole/_components/Transform/useTransform';
import TokenInput from '@/app/(pages)/wormhole/_components/TokenInput';
import Fee from '@/app/(pages)/wormhole/_components/Fee';
import { Button } from 'flowbite-react';
import { tokenList } from '@/app/(pages)/wormhole/_components/TokenInput/TokenTypeSelector';
import WithAuth from '@/app/components/Wallet/WithAuth';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';

const Transform = () => {
  const {
    open,
    calcFee,
    transform,
    onOpen,
    fromToken,
    setFromToken,
    toToken,
    setToToken,

    shouldDisabled,
  } = useTransform();
  const { trigger, loading } = usePromiseLoading(transform);
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
          tokenList={tokenList}
          onTokenChange={setFromToken}
          loading={loading}
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
            disabled: shouldDisabled(fromToken.type, token.value),
          }))}
          onTokenChange={setToToken}
        />
      </div>
      <Fee value={calcFee} />

      <WithAuth>
        <Button
          className="w-full mt-[42px]"
          color="primary"
          disabled={loading || !fromToken.amount || !toToken.amount}
          onClick={() => {
            trigger();
          }}
        >
          {loading ? <LoadingIcon /> : 'CONFIRM TRANSFORM'}
        </Button>
      </WithAuth>
    </div>
  );
};

export default Transform;
