import Support from "@/components/support";

export const metadata = {
    title: "Support | Brokwise",
    description: "Get in touch with our support team for any questions or assistance.",
};

const SupportPage = () => {
    return (
        <div className="landing-v2 bg-v2-navy font-sans">
            <main>
                <Support />
            </main>
        </div>
    );
};

export default SupportPage;
