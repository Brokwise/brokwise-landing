"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/v2/Footer";

const LayoutFooter = () => {
  const pathname = usePathname();

  // The legacy landing page ("/old") renders its own legacy footer; every
  // other route shares the v2 footer.
  if (pathname === "/old") {
    return null;
  }

  return <Footer />;
};

export default LayoutFooter;
