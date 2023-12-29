"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Container from "@/app/components/container";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout(props) {
  return (
    <html lang="en">
      <title>CFXs Marketspace</title>
      <body className={inter.className}>
        <Container {...props} />
      </body>
    </html>
  );
}
