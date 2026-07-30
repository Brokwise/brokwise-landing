import Support from "@/components/support";
import Navbar from "@/components/v2/Navbar";
import Footer from "@/components/v2/Footer";

export const metadata = {
    title: "Support | Brokwise",
    description: "Get in touch with our support team for any questions or assistance.",
};

const SupportPage = () => {
    return (
        <div className="landing-v2 bg-v2-navy font-sans">
            <Navbar />
            <main>
                <Support />
            </main>
            <Footer />
        </div>
    );
};

export default SupportPage;
