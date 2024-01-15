'use client';
import { DocsIcon } from '@/app/components/icons';
import DocsModal from '@/app/(pages)/wormhole/_component/DocsModal';
import useTransform from '@/app/(pages)/wormhole/_component/useTransform';

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
    </div>
  );
};

export default Transform;
