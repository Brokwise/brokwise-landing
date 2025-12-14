import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Brokwise",
  description: "Connect. Transact. Grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-neutral-950 text-neutral-200 overflow-x-hidden selection:bg-white/20`}
      >
        <Script
          src="https://www.aura.build/FxFilter.js"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
