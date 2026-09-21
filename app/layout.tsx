import type { Metadata } from "next";
import { nohemi } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ziana Saif — Product Designer",
  description:
    "I design products end-to-end, from 0→1 builds to fixing what's already broken.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nohemi.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
