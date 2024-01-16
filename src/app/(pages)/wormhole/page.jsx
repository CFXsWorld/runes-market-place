'use client';

import Transform from '@/app/(pages)/wormhole/_components/Transform';
import useMockMintCFXs from '@/app/hooks/useMockMintCFXs';

export default function Wormhole() {
  const { mint } = useMockMintCFXs();
  return (
    <div className="pt-[24px] flex-center pt-[70px]">
      <div className="w-full max-w-[500px] bg-fill-e-secondary min-h-[450px] rounded-[4px] md:p-[32px] max-md:p-[16px]">
        <Transform />
      </div>
      <button
        onClick={() => {
          mint();
        }}
      >
        mintxtx
      </button>
    </div>
  );
}
