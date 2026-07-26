"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer";

const LayoutFooter = () => {
  const pathname = usePathname();

  // "/" (new landing) and "/old" (legacy landing) each render their own footer.
  if (pathname === "/" || pathname === "/old") {
    return null;
  }

  return <Footer />;
};

export default LayoutFooter;
