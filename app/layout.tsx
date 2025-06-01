import type { Metadata } from "next";
import "./globals.css";

import { Cairo } from "next/font/google";
import AOSProvider from "@/components/Provider/AOSProvider";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-Cairo",
});

export const metadata: Metadata = {
  title: "Store Website",
  description: "Store website for baying and selling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="shortcut icon" href="/logosvg.svg" type="image/x-icon" />
      </head>

      <body className={`${cairo.variable} antialiased`}>
        <AOSProvider>{children}</AOSProvider>
      </body>
    </html>
  );
}
