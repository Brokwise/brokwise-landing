"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/navbar";
import Navbar from "@/components/v2/Navbar";

/**
 * The global navbar. Every route gets the v2 navbar except the legacy landing
 * page ("/old"), which keeps the navbar it was designed with.
 */
const SiteNav = () => {
  const pathname = usePathname();

  if (pathname === "/old") {
    return <NavBar />;
  }

  return <Navbar />;
};

export default SiteNav;
