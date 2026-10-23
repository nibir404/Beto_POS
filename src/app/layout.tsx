import type { Metadata, Viewport } from "next";
import { Galada, Hind_Siliguri, Inter, Inter_Tight } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// Stand-in for Helvetica Now Display, which is used first when installed.
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });
const galada = Galada({ subsets: ["latin", "bengali"], weight: "400", variable: "--font-galada" });
const hind = Hind_Siliguri({ subsets: ["latin", "bengali"], weight: ["400", "500", "600"], variable: "--font-hind" });

export const metadata: Metadata = {
  title: "Beto POS — The AI POS for retail chains",
  description:
    "Every counter. Every store. One set of numbers. Beto POS runs showrooms, franchises and head office on one system, with an AI that keeps count.",
};

export const viewport: Viewport = {
  themeColor: "#17120E",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${galada.variable} ${hind.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
