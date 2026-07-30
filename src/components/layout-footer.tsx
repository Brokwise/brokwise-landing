"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer";

const LayoutFooter = () => {
  const pathname = usePathname();

  // "/" (new landing), "/old" (legacy landing) and "/support" each render their
  // own footer.
  if (pathname === "/" || pathname === "/old" || pathname === "/support") {
    return null;
  }

  return <Footer />;
};

export default LayoutFooter;
