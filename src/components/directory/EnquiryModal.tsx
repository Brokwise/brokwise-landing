"use client";

import { useState } from "react";
import { X, Check, Lock, ShieldCheck } from "lucide-react";
import { submitEnquiry } from "@/lib/directory/api";
import {
  CATEGORY_LABEL,
  PropertyCategory,
  ProfileDetail,
} from "@/lib/directory/types";

export default function EnquiryModal({ profile }: { profile: ProfileDetail }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cats = profile.propertyCategories.length
    ? profile.propertyCategories
    : (["RESIDENTIAL"] as PropertyCategory[]);
  const areaNames = profile.areas.map((a) => a.label);

  const [selCats, setSelCats] = useState<Set<string>>(new Set([cats[0]!]));
  const [selAreas, setSelAreas] = useState<Set<string>>(
    new Set(areaNames.slice(0, 1))
  );
  const [callback, setCallback] = useState(true);

  const isBroker = profile.profileType === "BROKER";

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setDone(false);
      setError(null);
    }, 200);
  };

  const toggle = (set: Set<string>, v: string, apply: (s: Set<string>) => void) => {
    const next = new Set(set);
    if (next.has(v)) next.delete(v);
    else next.add(v);
    apply(next);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const expertCategories = Array.from(selCats);
    if (expertCategories.length === 0) {
      setError("Please select at least one category.");
      return;
    }
    setSubmitting(true);
    const res = await submitEnquiry({
      slug: profile.slug,
      visitorName: String(form.get("name") || ""),
      visitorPhone: String(form.get("phone") || ""),
      visitorEmail: String(form.get("email") || "") || undefined,
      expertCategories,
      preferredAreas: Array.from(selAreas),
      requestCallback: callback,
      message: String(form.get("message") || "") || undefined,
    });
    setSubmitting(false);
    if (res.ok) setDone(true);
    else setError(res.error || "Could not send enquiry.");
  }

  const chip = (active: boolean) =>
    `mono-label rounded-full border px-2.5 py-1.5 text-[11px] font-medium transition ${
      active
        ? "border-brand bg-brand text-on-brand"
        : "border-line-strong bg-surface text-dmuted hover:border-brand hover:text-ink"
    }`;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 w-full rounded-lg bg-brand py-3 text-[15px] font-bold text-on-brand transition hover:bg-brand-strong"
      >
        Send an enquiry
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-5 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && close()}
          role="dialog"
          aria-modal="true"
        >
          <div className="max-h-[calc(100vh-40px)] w-full max-w-[440px] overflow-y-auto rounded-2xl border border-line bg-surface shadow-2xl">
            {done ? (
              <div className="px-7 py-9 text-center">
                <div className="mx-auto mb-3.5 grid h-13 w-13 place-items-center rounded-full bg-good-soft p-3 text-good">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-extrabold">Enquiry sent</h3>
                <p className="mx-auto mt-2 max-w-[34ch] text-sm text-dmuted">
                  {profile.displayName} just received your enquiry in the Brokwise
                  app and will reach out to you directly. No contact details are
                  shared until they respond.
                </p>
                <button
                  onClick={close}
                  className="mt-4 w-full rounded-lg bg-brand py-3 text-[15px] font-bold text-on-brand hover:bg-brand-strong"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="flex items-start justify-between px-5 pt-5">
                  <div>
                    <h3 className="text-[19px] font-extrabold tracking-tight">Send an enquiry</h3>
                    <div className="mt-0.5 text-[13px] text-dmuted">
                      to {profile.displayName}
                      {profile.city ? ` · ${profile.city}` : ""}
                    </div>
                  </div>
                  <button type="button" onClick={close} aria-label="Close" className="p-1 text-faint hover:text-ink">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-3 px-5 pb-5 pt-4">
                  <div>
                    <label className="mb-1.5 block text-[12.5px] font-semibold text-dmuted">
                      I&apos;m looking for <span className="font-normal text-faint">(select all that apply)</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {cats.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => toggle(selCats, c, setSelCats)}
                          className={chip(selCats.has(c))}
                        >
                          {CATEGORY_LABEL[c]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {areaNames.length > 0 && (
                    <div>
                      <label className="mb-1.5 block text-[12.5px] font-semibold text-dmuted">
                        Preferred areas <span className="font-normal text-faint">(select one or more)</span>
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {areaNames.map((a) => (
                          <button
                            key={a}
                            type="button"
                            onClick={() => toggle(selAreas, a, setSelAreas)}
                            className={chip(selAreas.has(a))}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <Field label="Your name">
                    <input name="name" required placeholder="e.g. Ankit Verma" className={inputCls} />
                  </Field>
                  <Field label="Phone number">
                    <input name="phone" required type="tel" placeholder="+91 90000 00000" className={inputCls} />
                  </Field>
                  <Field label="Email" optional>
                    <input name="email" type="email" placeholder="you@email.com" className={inputCls} />
                  </Field>
                  <Field label="Anything specific?" optional>
                    <textarea name="message" rows={2} placeholder="Budget, timeline, requirements..." className={inputCls} />
                  </Field>

                  <label className="flex cursor-pointer items-center gap-2.5 text-[13.5px]">
                    <input
                      type="checkbox"
                      checked={callback}
                      onChange={(e) => setCallback(e.target.checked)}
                      className="h-4 w-4 accent-brand"
                    />
                    Please request a call back
                  </label>

                  <div className="flex items-center gap-2.5 rounded-lg border border-line bg-surface-2 px-3 py-2.5 text-[12.5px] text-dmuted">
                    <ShieldCheck className="h-4 w-4 text-good" />
                    Protected by verification
                  </div>

                  {error && <p className="text-[13px] font-medium text-red-600">{error}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-lg bg-brand py-3 text-[15px] font-bold text-on-brand transition hover:bg-brand-strong disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Send enquiry"}
                  </button>

                  <p className="flex items-start gap-2 text-[12px] text-faint">
                    <Lock className="mt-0.5 h-3.5 w-3.5 flex-none text-good" />
                    Your details go only to this {isBroker ? "broker" : "agency"}. Their
                    contact stays private until they respond.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const inputCls =
  "w-full rounded-lg border border-line-strong bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-brand";

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[12.5px] font-semibold text-dmuted">
        {label} {optional && <span className="font-normal text-faint">(optional)</span>}
      </label>
      {children}
    </div>
  );
}
