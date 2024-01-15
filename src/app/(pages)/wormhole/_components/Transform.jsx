'use client';
import { ArrowDownLineIcon, DocsIcon } from '@/app/components/icons';
import DocsModal from '@/app/(pages)/wormhole/_components/DocsModal';
import useTransform from '@/app/(pages)/wormhole/_components/useTransform';
import TokenInput from '@/app/(pages)/wormhole/_components/TokenInput';
import Fee from '@/app/(pages)/wormhole/_components/Fee';
import { Button } from 'flowbite-react';

const Transform = () => {
  const { open, onOpen } = useTransform();
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
        <TokenInput label="Amount" />
        <div className="h-[42px] absolute-center bg-fill-e-secondary w-[42px] border-[1px] border-black rounded-[4px] flex-center">
          <ArrowDownLineIcon />
        </div>
        <TokenInput label="Will Receive" />
      </div>
      <Fee />
      <Button className="w-full mt-[42px]" color="primary" disabled>
        CONFIRM TRANSFORM
      </Button>
    </div>
  );
};

export default Transform;
