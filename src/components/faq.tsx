"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQCategory {
    category: string;
    items: FAQItem[];
}

const faqData: FAQCategory[] = [
    {
        category: "General",
        items: [
            {
                question: "What is Brokwise?",
                answer:
                    "Brokwise is India's leading real estate brokerage platform that connects brokers with property listings and enquiries. It helps brokers manage properties, respond to client requirements, and collaborate effectively.",
            },
            {
                question: "How do I sign up for Brokwise?",
                answer:
                    "You can sign up for Brokwise by downloading the app or visiting the website. Complete the registration process to create your account and receive a welcome bonus of 25 FREE credits.",
            },
        ],
    },
    {
        category: "Credits & Payments",
        items: [
            {
                question: "What are Credits?",
                answer:
                    "Credits are the virtual currency used on Brokwise to perform premium actions, such as requesting contact details, marking properties as featured, or posting additional enquiries.",
            },
            {
                question: "How can I purchase Credits?",
                answer:
                    "You can purchase Credits by going to Menu → Credits, selecting a credit pack that suits your needs, and completing the payment via Razorpay.",
            },
            {
                question: "How do I check my Credit balance?",
                answer:
                    "Your Credit balance is displayed in the app header/menu. You can also go to Menu → Credits to view your full transaction history.",
            },
        ],
    },
    {
        category: "Subscription",
        items: [
            {
                question: "What subscription plans does Brokwise offer?",
                answer:
                    "Brokwise offers three subscription plans:\n\n• STARTER Plan: Free forever with limited features.\n• ESSENTIAL Plan: Paid plan with more features and support.\n• ELITE Plan: Premium plan for high-volume brokers with advanced features.",
            },
            {
                question: "How can I upgrade my subscription plan?",
                answer:
                    "You can upgrade your plan anytime through Menu → Subscription, select the desired plan and duration, and complete the payment.",
            },
        ],
    },
    {
        category: "Property",
        items: [
            {
                question: "How do I list a property on Brokwise?",
                answer:
                    'To list a property, navigate to "List Property" and fill in the required details, including category, type, location, size, price, and images. Submit for approval once completed.',
            },
            {
                question: "What are the different statuses a property can have?",
                answer:
                    "A property goes through several statuses: Draft, Pending Approval, Active, Rejected, and Delisted.",
            },
        ],
    },
    {
        category: "Enquiries",
        items: [
            {
                question: "How do I post an enquiry?",
                answer:
                    'To post an enquiry, tap "Post Enquiry," select the category/type, add budget range and preferred locations, specify size requirements, and describe specific client needs before submitting.',
            },
        ],
    },
];

const FAQ = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggleFAQ = (index: string) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full py-20 bg-background text-foreground font-sans">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-foreground">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto">
                        Everything you need to know about Brokwise, credits, subscriptions, and more.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {faqData.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setActiveTab(index);
                                setOpenIndex(null); // Close open items when switching tabs
                            }}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm md:text-base transition-all duration-300 border",
                                activeTab === index
                                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                                    : "bg-transparent text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
                            )}
                        >
                            {category.category}
                        </button>
                    ))}
                </div>

                {/* Questions */}
                <div className="min-h-[400px]">
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {faqData[activeTab].items.map((item, itemIndex) => {
                            const uniqueId = `${activeTab}-${itemIndex}`;
                            const isOpen = openIndex === uniqueId;

                            return (
                                <div
                                    key={itemIndex}
                                    className={cn(
                                        "rounded-lg border border-border bg-card transition-all duration-200 ease-in-out",
                                        isOpen ? "shadow-md border-primary/20" : "hover:border-primary/20"
                                    )}
                                >
                                    <button
                                        onClick={() => toggleFAQ(uniqueId)}
                                        className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                                        aria-expanded={isOpen}
                                    >
                                        <span className="text-base md:text-lg font-normal text-foreground pr-8">
                                            {item.question}
                                        </span>
                                        <span className="shrink-0 text-muted-foreground">
                                            {isOpen ? (
                                                <Minus className="h-5 w-5" />
                                            ) : (
                                                <Plus className="h-5 w-5" />
                                            )}
                                        </span>
                                    </button>
                                    <div
                                        className={cn(
                                            "grid transition-all duration-300 ease-in-out",
                                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        )}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="p-6 pt-0 text-muted-foreground font-light leading-relaxed whitespace-pre-line">
                                                {item.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
