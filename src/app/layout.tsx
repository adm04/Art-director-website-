import type { Metadata } from "next";
import { Geist, Inter, Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Menu } from "@/components/Menu";
import { CursorLabel } from "@/components/CursorLabel";
import { SmoothScroll } from "@/components/SmoothScroll";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], axes: ["opsz"] });
const interTight = Inter_Tight({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600"] });
const serif = Instrument_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: `Portfolio — ${site.name.first} ${site.name.last}`,
  description: "Art director portfolio",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${inter.variable} ${interTight.variable} ${serif.variable}`}>
        <SmoothScroll />
        <Menu />
        {children}
        <CursorLabel />
      </body>
    </html>
  );
}
