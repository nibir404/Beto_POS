import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Outfit } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-outfit" });
// Outfit has no Bengali glyphs, so Bangla text uses Hind Siliguri.
const hind = Hind_Siliguri({ subsets: ["latin", "bengali"], weight: ["400", "500", "600", "700"], variable: "--font-hind" });

export const metadata: Metadata = {
  title: "Beto POS — The AI POS for retail chains",
  description:
    "Every counter. Every store. One set of numbers. Beto POS runs showrooms, franchises and head office on one system, with an AI that keeps count.",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${hind.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
