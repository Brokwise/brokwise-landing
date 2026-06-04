import SmoothScrolling from "@/components/smooth-scrolling";
import { Public_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import LayoutFooter from "@/components/layout-footer";
import FacebookPixel from "@/components/facebook-pixel";
import { PostHogProvider } from "@/components/posthog-provider";
import { headers } from "next/headers";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  weight: ["300", "400", "500"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Brokwise",
  description: "Connect. Transact. Grow.",
};

// Read from env so the ID can be rotated without a code change.
// Falls back to the current container ID so existing deployments keep working.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-WWKVWDVS";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // middleware (src/middleware.ts) generates a fresh nonce per request and
  // forwards it on the x-nonce request header. We read it here and stamp it
  // onto every inline <Script> so the browser's CSP lets those scripts run.
  const nonce = headers().get("x-nonce") ?? undefined;

  return (
    <html lang="en">
      <body
        className={`${publicSans.variable} ${playfairDisplay.variable} antialiased bg-background text-foreground overflow-x-hidden selection:bg-primary/10 font-sans`}
      >
        {/* GTM spec requires the noscript fallback as the very first child of <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Analytics />

        {/* Inline GTM loader — the nonce attribute lets the CSP trust this script */}
        <Script
          id="gtm-script"
          nonce={nonce}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />

        <FacebookPixel nonce={nonce} />

        <PostHogProvider>
          <SmoothScrolling>
            {/* External src scripts are covered by the domain allowlist in CSP — no nonce needed */}
            <Script
              src="https://www.aura.build/FxFilter.js"
              strategy="afterInteractive"
            />
            <NavBar />
            {children}
            <LayoutFooter />
          </SmoothScrolling>
        </PostHogProvider>
      </body>
    </html>
  );
}
