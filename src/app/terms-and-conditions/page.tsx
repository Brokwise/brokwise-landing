"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";


export default function TermsAndConditionsPage() {
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/legal/terms-and-conditions.md")
            .then((res) => res.text())
            .then((text) => {
                setContent(text);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Navy band so the fixed v2 navbar sits on the same dark ground as
                every other page, and the title clears it. */}
            <header className="bg-v2-navy pt-28 pb-10 md:pt-32 md:pb-12">
                <div className="max-w-4xl mx-auto px-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white/60 transition-colors hover:text-v2-gold"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back
                    </Link>
                    <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">Terms of Use for Brokers</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900" />
                    </div>
                ) : (
                    <article className="legal-content">
                        <ReactMarkdown
                            components={{
                                // The page header above already shows the document title.
                                h1: () => null,
                                h2: ({ children }) => (
                                    <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 mb-4 mt-8">{children}</h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3">{children}</h3>
                                ),
                                p: ({ children }) => (
                                    <p className="text-slate-600 leading-relaxed mb-4 text-justify">{children}</p>
                                ),
                                ul: ({ children }) => (
                                    <ul className="list-disc list-outside text-slate-600 space-y-2 mb-4 pl-6">{children}</ul>
                                ),
                                li: ({ children }) => (
                                    <li className="text-slate-600 leading-relaxed text-justify [&>p]:inline [&>p]:m-0">{children}</li>
                                ),
                                strong: ({ children }) => (
                                    <strong className="text-slate-800 font-semibold">{children}</strong>
                                ),
                                hr: () => (
                                    <hr className="my-8 border-slate-200" />
                                ),
                                a: ({ children, href }) => (
                                    <a href={href} className="text-teal-600 hover:underline">{children}</a>
                                ),
                                em: ({ children }) => (
                                    <em className="text-slate-500 text-sm">{children}</em>
                                ),
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </article>
                )}
            </main>


        </div>
    );
}
