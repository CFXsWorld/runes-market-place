'use client';

import Attention from '@/app/(pages)/my/_components/Attention';
import Filter from '@/app/(pages)/my/_components/Filter';
import MyCFXsList from '@/app/(pages)/my/_components/MyCFXsList';

export default function My() {
  return (
    <div className="mt-[24px]">
      <Attention />
      <MyCFXsList />
    </div>
  );
}
