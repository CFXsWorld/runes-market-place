'use client';

import Header from '@/app/components/Header/index';
import 'react-toastify/dist/ReactToastify.css';

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto pt-[68px]">{children}</div>
    </div>
  );
}
