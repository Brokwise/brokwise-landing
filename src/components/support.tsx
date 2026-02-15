"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Mail, MapPin, Phone, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const Support = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        category: "General Inquiry",
        message: "",
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("https://api.brokwise.com/api/form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form");
            }

            setStatus("success");
            setFormData({
                name: "",
                email: "",
                contactNumber: "",
                category: "General Inquiry",
                message: "",
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus("error");
            setErrorMessage("Something went wrong. Please try again later.");
        }
    };

    return (
        <section className="w-full min-h-screen bg-background text-foreground font-sans py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left Column: Contact Info */}
                    <div className="flex flex-col justify-center space-y-12">
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground/90">
                                Get in touch
                            </h1>
                            <p className="text-lg font-light text-muted-foreground leading-relaxed max-w-md">
                                We&apos;re here to help. Whether you have a question about our platform, need technical assistance, or just want to say hello.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-4 group">
                                <div className="p-3 rounded-full bg-muted/50 group-hover:bg-primary/5 transition-colors duration-300">
                                    <MapPin className="w-5 h-5 text-foreground/70" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Office</h3>
                                    <p className="font-light text-foreground/80 leading-relaxed">
                                        P NO. A-27, BAHUBALI NAGAR, JAIPUR<br />
                                        Mansarovar, Jaipur - 302020<br />
                                        Rajasthan, India
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 group">
                                <div className="p-3 rounded-full bg-muted/50 group-hover:bg-primary/5 transition-colors duration-300">
                                    <Phone className="w-5 h-5 text-foreground/70" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Phone</h3>
                                    <a href="tel:+919929750046" className="font-light text-foreground/80 hover:text-primary transition-colors block">
                                        +91 99297 50046
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 group">
                                <div className="p-3 rounded-full bg-muted/50 group-hover:bg-primary/5 transition-colors duration-300">
                                    <Mail className="w-5 h-5 text-foreground/70" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Email</h3>
                                    <a href="mailto:support@brokwise.com" className="font-light text-foreground/80 hover:text-primary transition-colors block">
                                        support@brokwise.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <h2 className="text-2xl font-light mb-8 text-foreground/90 relative z-10">Send us a message</h2>

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-light text-muted-foreground ml-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/30 transition-all font-light placeholder:text-muted-foreground/50"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-light text-muted-foreground ml-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/30 transition-all font-light placeholder:text-muted-foreground/50"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="contactNumber" className="text-sm font-light text-muted-foreground ml-1">Contact Number</label>
                                    <input
                                        type="tel"
                                        id="contactNumber"
                                        name="contactNumber"
                                        required
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/30 transition-all font-light placeholder:text-muted-foreground/50"
                                        placeholder="+91 00000 00000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="category" className="text-sm font-light text-muted-foreground ml-1">Category</label>
                                    <div className="relative">
                                        <select
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/30 transition-all font-light appearance-none cursor-pointer"
                                        >
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Technical Support">Technical Support</option>
                                            <option value="Billing">Billing</option>
                                            <option value="Partnership">Partnership</option>
                                            <option value="Feedback">Feedback</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-light text-muted-foreground ml-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/30 transition-all font-light placeholder:text-muted-foreground/50 resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={status === "loading" || status === "success"}
                                    className={cn(
                                        "w-full py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-light text-sm tracking-wide",
                                        status === "success"
                                            ? "bg-green-500/10 text-green-600 cursor-default border border-green-500/20"
                                            : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                                    )}
                                >
                                    {status === "loading" ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : status === "success" ? (
                                        <>
                                            <span>Message Sent</span>
                                            <CheckCircle2 className="w-4 h-4" />
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>

                            {status === "error" && (
                                <div className="flex items-center gap-2 text-red-500 text-sm font-light bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <p>{errorMessage}</p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Support;
