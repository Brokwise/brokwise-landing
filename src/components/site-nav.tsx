import Navbar from "@/components/v2/Navbar";
import { fetchMarketplaceLaunch } from "@/lib/directory/launch";

/**
 * The global navbar: every route gets the v2 navbar. Properties is linked only
 * while the customer marketplace is live (admin Settings > Feature launches).
 */
const SiteNav = async () => {
  const marketplace = await fetchMarketplaceLaunch();
  return <Navbar showProperties={marketplace.live} />;
};

export default SiteNav;
