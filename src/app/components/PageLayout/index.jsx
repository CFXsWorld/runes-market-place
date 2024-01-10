'use client';

import Header from '@/app/components/Header/index';

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="w-full md:px-[60px] max-md:px-[20px]">
        <div className="md:max-w-[1368px] w-full mx-auto pt-[80px]">{children}</div>
      </div>
    </div>
  );
}
