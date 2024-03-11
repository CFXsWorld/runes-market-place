'use client';

import {
  ArrowDownLineIcon,
  DocsIcon,
  LoadingIcon,
} from '@/app/components/icons';
import DocsModal from '@/app/(pages)/wormhole/_components/Transform/DocsModal';
import useTransform from '@/app/(pages)/wormhole/_components/Transform/useTransform';
import Fee from '@/app/(pages)/wormhole/_components/Fee';
import { Button } from 'flowbite-react';
import { tokenList } from '@/app/(pages)/wormhole/_components/TokenInput/TokenTypeSelector';
import WithAuth from '@/app/components/Wallet/WithAuth';
import usePromiseLoading from '@/app/hooks/usePromiseLoading';
import FromInput from '@/app/(pages)/wormhole/_components/TokenInput/FromInput';
import ToInput from '@/app/(pages)/wormhole/_components/TokenInput/ToInput';
import Link from 'next/link';
import { cn } from '@/app/utils/classnames';
import { useState } from 'react';

export const tabs = [
  {
    name: 'Image',
    type: 'image',
    value: 1,
  },
  {
    name: 'Audio',
    type: 'audio',
    path: '/my/audio',
    value: 2,
  },
  {
    name: 'Text',
    type: 'text',
    path: '/my/text',
    value: 3,
  },
];
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
  const [type, setType] = useState('');
  return (
    <div className="flex flex-col">
      <div className="flex-center-between">
        <span>Inscribe CFXs</span>
      </div>
      <div className="flex items-center justify-between text-[16px] max-md:text-[12px] font-[500] text-tc-secondary">
        <div className="flex items-center">
          {tabs.map((tab) => (
            <div
              key={tab.value}
              className={cn(
                'px-[6px] mr-[32px] max-md:mr-[10px] py-[6px]   cursor-pointer',
                {
                  'bg-fill-e-primary text-theme rounded-[6px]':
                    type === tab.type,
                }
              )}
            >
              {tab.name}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-[24px] gap-[16px] relative">
        <FromInput
          token={fromToken}
          tokenList={tokenList}
          onTokenChange={setFromToken}
          loading={loading}
        />
        <div className="h-[42px] absolute-center bg-fill-e-secondary w-[42px] border-[1px] border-black rounded-[4px] flex-center">
          <ArrowDownLineIcon />
        </div>
        <ToInput
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
          disabled={
            loading ||
            !fromToken.amount ||
            !toToken.amount ||
            !fromToken.type ||
            !toToken.type
          }
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
