import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { nohemi } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zianasaif.vercel.app"),
  title: "Ziana Saif — Product Designer",
  description:
    "I design products end-to-end, from 0→1 builds to fixing what's already broken.",
  openGraph: {
    title: "Ziana Saif — Product Designer",
    description:
      "I design products end-to-end, from 0→1 builds to fixing what's already broken.",
    url: "https://zianasaif.vercel.app",
    siteName: "Ziana Saif",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ziana Saif — Product Designer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziana Saif — Product Designer",
    description:
      "I design products end-to-end, from 0→1 builds to fixing what's already broken.",
    images: ["/og-image.png"],
  },
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
      <body className="flex min-h-full flex-col">
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
