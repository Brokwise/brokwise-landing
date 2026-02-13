import Support from "@/components/support";
import React from "react";

export const metadata = {
    title: "Support | Brokwise",
    description: "Get in touch with our support team for any questions or assistance.",
};

const SupportPage = () => {
    return (
        <main className="min-h-screen bg-background pt-10">
            <Support />
        </main>
    );
};

export default SupportPage;
