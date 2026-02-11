import { Public_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import Script from "next/script";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  weight: ["300", "400", "500"],
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
        className={`${publicSans.variable} antialiased bg-background text-foreground overflow-x-hidden selection:bg-primary/10 font-sans`}
      >
        <Script
          src="https://www.aura.build/FxFilter.js"
          strategy="afterInteractive"
        />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
