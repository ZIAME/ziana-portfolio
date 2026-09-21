import localFont from "next/font/local";

// Wordmark only — see AGENTS.md, Satoshi (loaded via Fontshare <link> in layout.tsx)
// is the base font for everything else.
export const nohemi = localFont({
  src: [
    {
      path: "../fonts/nohemi/Nohemi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/nohemi/Nohemi-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/nohemi/Nohemi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/nohemi/Nohemi-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-nohemi",
  display: "swap",
});
