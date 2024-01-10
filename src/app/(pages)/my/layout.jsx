'use client';

import Tabs from './_components/Tabs';

export default function Layout({ children }) {
  return (
    <div className='pt-[24px] max-md:pt-[20px]'>
      <Tabs />
      {children}
    </div>
  );
}
