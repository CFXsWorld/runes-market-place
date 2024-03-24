'use client';

import Inscribe from './_components/Inscribe';
import Records from '@/app/(pages)/inscribe/_components/Records';

export default function Wormhole() {
  return (
    <div className="pt-[24px] flex flex-col items-center justify-center pt-[70px]">
      <div className="w-full max-w-[500px] bg-fill-e-secondary min-h-[450px] rounded-[4px] md:p-[32px] max-md:p-[16px]">
        <Inscribe />
      </div>

      <div className="w-full max-w-[500px] mt-[40px]">
        <Records />
      </div>
    </div>
  );
}
