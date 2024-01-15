'use client';

import Transform from "@/app/(pages)/wormhole/_components/Transform";

export default function Wormhole() {
  return (
    <div className="pt-[24px] flex-center pt-[70px]">
      <div className="w-full max-w-[500px] bg-fill-e-secondary min-h-[450px] rounded-[4px] md:p-[32px] max-md:p-[16px]">
        <Transform/>
      </div>
    </div>
  );
}
