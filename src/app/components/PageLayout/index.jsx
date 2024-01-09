'use client';

import Header from '@/app/components/Header/index';
import 'react-toastify/dist/ReactToastify.css';

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="w-full px-[60px]">
        <div className="md:max-w-[1368px] w-full mx-auto pt-[80px]">{children}</div>
      </div>
    </div>
  );
}
