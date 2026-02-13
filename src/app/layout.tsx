import SmoothScrolling from "@/components/smooth-scrolling";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"
import LayoutFooter from "@/components/layout-footer";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  weight: ["300", "400", "500"],
});

export const metadata = {
  title: "Brokwise",
  description: "Connect. Transact. Grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body
        className={`${publicSans.variable} antialiased bg-background text-foreground overflow-x-hidden selection:bg-primary/10 font-sans`}
      >
        <Analytics />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WWKVWDVS');`,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WWKVWDVS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <SmoothScrolling>
          <Script
            src="https://www.aura.build/FxFilter.js"
            strategy="afterInteractive"
          />
          <NavBar />
          {children}
          <LayoutFooter />
        </SmoothScrolling>
      </body>
    </html>
  );
}
