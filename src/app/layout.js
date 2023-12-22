"use client";

import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Container from "@/app/components/container";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout(props) {
  return (
    <Suspense>
      <html lang="en">
        <title>Cfxs Marketspace</title>
        <body className={inter.className}>
          <Container {...props} />
        </body>
      </html>
    </Suspense>
  );
}
