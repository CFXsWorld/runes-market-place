'use client';

import { Inter } from 'next/font/google';
import PageLayout from "@/app/components/PageLayout";
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout(props) {
  return (
    <html lang="en">
      <title>CFXs Market space</title>
      <body className={inter.className}>
        <PageLayout {...props} />
      </body>
    </html>
  );
}
