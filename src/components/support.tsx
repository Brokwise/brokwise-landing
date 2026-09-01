"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    Mail,
    MapPin,
    Phone,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ChevronDown,
    type LucideIcon,
} from "lucide-react";
import { FOOTER_CONTACT } from "@/components/v2/content";

type SupportFormData = {
    name: string;
    email: string;
    contactNumber: string;
    category: string;
    message: string;
};

type FormErrors = Partial<Record<keyof SupportFormData, string>>;

const CONTACT_NUMBER_REGEX = /^\+?[0-9]{10,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CATEGORIES = [
    "General Inquiry",
    "Technical Support",
    "Billing",
    "Partnership",
    "Feedback",
] as const;

const validateField = (field: keyof SupportFormData, value: string): string => {
    switch (field) {
        case "name": {
            const normalized = value.trim();
            if (normalized.length < 2) return "Name must be at least 2 characters long";
            if (normalized.length > 100) return "Name cannot exceed 100 characters";
            return "";
        }
        case "email": {
            const normalized = value.trim().toLowerCase();
            if (!EMAIL_REGEX.test(normalized)) return "Please enter a valid email address";
            return "";
        }
        case "contactNumber":
            if (!CONTACT_NUMBER_REGEX.test(value.trim())) {
                return "Contact number must be 10-15 digits, optionally prefixed with +";
            }
            return "";
        case "category":
            if (!value.trim()) return "Please select a category";
            return "";
        case "message": {
            const normalized = value.trim();
            if (normalized.length < 10) return "Message must be at least 10 characters long";
            if (normalized.length > 2000) return "Message cannot exceed 2000 characters";
            return "";
        }
        default:
            return "";
    }
};

const validateForm = (data: SupportFormData): FormErrors => {
    const errors: FormErrors = {};
    (Object.keys(data) as Array<keyof SupportFormData>).forEach((field) => {
        const error = validateField(field, data[field]);
        if (error) errors[field] = error;
    });
    return errors;
};

const normalizeFormData = (data: SupportFormData): SupportFormData => ({
    ...data,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    contactNumber: data.contactNumber.trim(),
    category: data.category.trim(),
    message: data.message.trim(),
});

/* ── Shared field primitives (v2 landing form language) ───────────────── */

const CONTROL_BASE =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-v2-gold/60 focus:bg-white/[0.07]";

const CONTROL_INVALID = "border-red-400/60 focus:border-red-400/60";

const controlClass = (invalid: boolean) => cn(CONTROL_BASE, invalid && CONTROL_INVALID);

function Field({
    label,
    htmlFor,
    error,
    children,
}: {
    label: string;
    htmlFor: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label
                htmlFor={htmlFor}
                className="mb-2 block text-[13px] font-medium text-white/70"
            >
                {label}
            </label>
            {children}
            {error && <p className="mt-1.5 text-xs font-medium text-red-300">{error}</p>}
        </div>
    );
}

function ContactCard({
    icon: Icon,
    label,
    children,
}: {
    icon: LucideIcon;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-start gap-4 rounded-3xl border border-white/10 bg-v2-navy-2 p-6 transition-colors hover:border-v2-gold/30">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-v2-gold text-v2-ink">
                <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <div className="min-w-0">
                <h3 className="mono-label text-[11px] font-semibold text-v2-gold">{label}</h3>
                <div className="mt-2 text-[15px] leading-relaxed text-white/70">{children}</div>
            </div>
        </div>
    );
}

/* ── Page section ─────────────────────────────────────────────────────── */

const Support = () => {
    const [formData, setFormData] = useState<SupportFormData>({
        name: "",
        email: "",
        contactNumber: "",
        category: "General Inquiry",
        message: "",
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
    const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof SupportFormData, boolean>>>({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    /** A field shows its error only once the user has left it or tried to submit. */
    const errorFor = (field: keyof SupportFormData) =>
        (touchedFields[field] || hasSubmitted) && fieldErrors[field]
            ? fieldErrors[field]
            : undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const fieldName = name as keyof SupportFormData;
        setFormData((prev) => ({ ...prev, [fieldName]: value }));

        if (touchedFields[fieldName] || hasSubmitted) {
            const error = validateField(fieldName, value);
            setFieldErrors((prev) => ({ ...prev, [fieldName]: error || undefined }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const fieldName = name as keyof SupportFormData;

        setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
        const error = validateField(fieldName, value);
        setFieldErrors((prev) => ({ ...prev, [fieldName]: error || undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setHasSubmitted(true);
        setErrorMessage("");

        const normalizedData = normalizeFormData(formData);
        const errors = validateForm(normalizedData);
        setFieldErrors(errors);
        setFormData(normalizedData);

        if (Object.keys(errors).length > 0) {
            setStatus("idle");
            return;
        }

        setStatus("loading");

        try {
            const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
            if (!apiBase) throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");

            const response = await fetch(`${apiBase}/api/form`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(normalizedData),
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
            setFieldErrors({});
            setTouchedFields({});
            setHasSubmitted(false);
        } catch (error) {
            if (process.env.NODE_ENV === "development") {
                console.error("Error submitting form:", error);
            }
            // TODO: forward `error` to an error-monitoring service (e.g. PostHog captureException / Sentry) in production.
            setStatus("error");
            setErrorMessage("Something went wrong. Please try again later.");
        }
    };

    return (
        <section className="relative overflow-hidden bg-v2-navy pb-20 pt-28 md:pb-28 md:pt-32">
            <div className="v2-dotgrid absolute inset-0 opacity-30" />

            <div className="relative mx-auto max-w-6xl px-5 md:px-8">
                <div className="text-center">
                    <span className="mono-label inline-flex items-center gap-2.5 rounded-full border border-v2-gold/40 bg-v2-gold/10 px-4 py-2 text-[11.5px] font-semibold text-v2-gold">
                        <span aria-hidden className="h-2 w-2 rounded-full bg-v2-gold" />
                        Support
                    </span>

                    <h1 className="mt-7 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
                        Get in <span className="text-v2-gold">Touch</span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60">
                        We&apos;re here to help. Whether you have a question about the platform,
                        need technical assistance, or just want to say hello.
                    </p>
                </div>

                <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
                    {/* Contact details */}
                    <div className="flex flex-col gap-4">
                        <ContactCard icon={MapPin} label="Office">
                            {FOOTER_CONTACT.address.join(", ")}
                        </ContactCard>

                        <ContactCard icon={Phone} label="Phone">
                            <a
                                href={FOOTER_CONTACT.phoneHref}
                                className="transition-colors hover:text-v2-gold"
                            >
                                {FOOTER_CONTACT.phone}
                            </a>
                        </ContactCard>

                        <ContactCard icon={Mail} label="Email">
                            <a
                                href={`mailto:${FOOTER_CONTACT.email}`}
                                className="transition-colors hover:text-v2-gold"
                            >
                                {FOOTER_CONTACT.email}
                            </a>
                        </ContactCard>

                        <Link
                            href="/#faq"
                            className="group flex items-center justify-between gap-4 rounded-3xl border border-v2-gold/25 bg-v2-gold/[0.06] p-6 transition-colors hover:border-v2-gold/50 hover:bg-v2-gold/10"
                        >
                            <span>
                                <span className="block font-display text-base font-bold text-white">
                                    Looking for a quick answer?
                                </span>
                                <span className="mt-1.5 block text-sm text-white/60">
                                    Most questions are already covered in our FAQs.
                                </span>
                            </span>
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-v2-gold/40 text-v2-gold transition-colors group-hover:bg-v2-gold group-hover:text-v2-ink">
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </Link>
                    </div>

                    {/* Message form */}
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-v2-navy-2 p-6 md:p-9">
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-v2-gold/10 blur-3xl"
                        />

                        <h2 className="relative font-display text-2xl font-bold tracking-tight text-white">
                            Send us a message
                        </h2>

                        <form onSubmit={handleSubmit} noValidate className="relative mt-7 space-y-5">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field label="Name" htmlFor="name" error={errorFor("name")}>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        aria-invalid={Boolean(errorFor("name"))}
                                        className={controlClass(Boolean(errorFor("name")))}
                                        placeholder="Amit Jain"
                                    />
                                </Field>

                                <Field label="Email" htmlFor="email" error={errorFor("email")}>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        aria-invalid={Boolean(errorFor("email"))}
                                        className={controlClass(Boolean(errorFor("email")))}
                                        placeholder="you@email.com"
                                    />
                                </Field>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Field
                                    label="Contact Number"
                                    htmlFor="contactNumber"
                                    error={errorFor("contactNumber")}
                                >
                                    <input
                                        type="tel"
                                        id="contactNumber"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        aria-invalid={Boolean(errorFor("contactNumber"))}
                                        className={controlClass(Boolean(errorFor("contactNumber")))}
                                        placeholder="+91 90000 00000"
                                    />
                                </Field>

                                <Field label="Category" htmlFor="category" error={errorFor("category")}>
                                    <div className="relative">
                                        <select
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-invalid={Boolean(errorFor("category"))}
                                            className={cn(
                                                controlClass(Boolean(errorFor("category"))),
                                                "cursor-pointer appearance-none pr-11",
                                            )}
                                        >
                                            {CATEGORIES.map((category) => (
                                                <option
                                                    key={category}
                                                    value={category}
                                                    className="bg-v2-navy-2 text-white"
                                                >
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown
                                            aria-hidden
                                            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-v2-gold"
                                        />
                                    </div>
                                </Field>
                            </div>

                            <Field label="Message" htmlFor="message" error={errorFor("message")}>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    aria-invalid={Boolean(errorFor("message"))}
                                    className={cn(
                                        controlClass(Boolean(errorFor("message"))),
                                        "resize-none",
                                    )}
                                    placeholder="How can we help you?"
                                />
                            </Field>

                            <button
                                type="submit"
                                disabled={status === "loading" || status === "success"}
                                className={cn(
                                    "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all",
                                    status === "success"
                                        ? "cursor-default border border-emerald-400/30 bg-emerald-400/15 text-emerald-300"
                                        : "bg-v2-gold text-v2-ink hover:bg-v2-gold-2 hover:scale-[1.01] active:scale-95 disabled:cursor-wait disabled:opacity-70",
                                )}
                            >
                                {status === "loading" ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : status === "success" ? (
                                    <>
                                        <CheckCircle2 className="h-4 w-4" />
                                        Message Sent
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>

                            {status === "error" && (
                                <div className="flex items-center gap-2.5 rounded-xl border border-red-400/20 bg-red-400/10 p-3.5 text-sm font-medium text-red-300">
                                    <AlertCircle className="h-4 w-4 shrink-0" />
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
