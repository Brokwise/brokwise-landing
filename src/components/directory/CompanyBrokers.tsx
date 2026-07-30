"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ShieldCheck, X, MapPin } from "lucide-react";
import {
  CATEGORY_LABEL,
  CompanyBroker,
  ProfileDetail,
  PropertyCategory,
} from "@/lib/directory/types";
import EnquiryModal from "./EnquiryModal";

const CATEGORY_ORDER: PropertyCategory[] = [
  "RESIDENTIAL",
  "COMMERCIAL",
  "INDUSTRIAL",
  "AGRICULTURAL",
  "RESORT",
  "FARM_HOUSE",
];

function initials(name: string): string {
  const parts = (name || "").trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() || "").join("") || "B";
}

function Avatar({ broker, size }: { broker: CompanyBroker; size: number }) {
  const cls = `flex-none rounded-full object-cover`;
  return broker.profilePhoto ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={broker.profilePhoto}
      alt={broker.fullName}
      className={cls}
      style={{ height: size, width: size }}
    />
  ) : (
    <div
      className="grid flex-none place-items-center rounded-full bg-brand-soft font-bold text-brand-ink"
      style={{ height: size, width: size, fontSize: size / 2.6 }}
    >
      {initials(broker.fullName)}
    </div>
  );
}

export default function CompanyBrokers({ profile }: { profile: ProfileDetail }) {
  const brokers = profile.brokers || [];
  if (brokers.length === 0) {
    return (
      <p className="mt-4 text-[14px] text-dmuted">
        This channel partner hasn&apos;t listed any brokers yet. Send an enquiry and
        they&apos;ll connect you with the right one.
      </p>
    );
  }

  const groups = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: brokers.filter((b) => b.categories.includes(cat)),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="mt-4 flex flex-col gap-8">
      {groups.map(({ cat, items }) => (
        <div key={cat}>
          <div className="mono-label text-[11.5px] font-semibold text-brand-ink">
            {CATEGORY_LABEL[cat]} <span className="text-faint">· {items.length}</span>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {items.map((b) => (
              <BrokerCard key={`${cat}-${b.brokerId}`} broker={b} profile={profile} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BrokerCard({
  broker,
  profile,
}: {
  broker: CompanyBroker;
  profile: ProfileDetail;
}) {
  const [view, setView] = useState(false);

  return (
    <div className="flex flex-col rounded-xl border border-line bg-surface p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar broker={broker} size={44} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-display text-[15px] font-bold tracking-tight">
              {broker.fullName}
            </h3>
            {broker.reraNumber && (
              <ShieldCheck className="h-3.5 w-3.5 flex-none text-good" aria-label="RERA verified" />
            )}
          </div>
          {(broker.city || broker.yearsOfExperience) && (
            <div className="mono-label mt-0.5 flex items-center gap-1 text-[10.5px] text-faint">
              <MapPin className="h-3 w-3" />
              {[broker.city, broker.yearsOfExperience ? `${broker.yearsOfExperience} yrs` : null]
                .filter(Boolean)
                .join(" · ")}
            </div>
          )}
        </div>
      </div>

      {broker.description && (
        <p className="mt-2.5 line-clamp-3 text-[13px] leading-relaxed text-dmuted">
          {broker.description}
        </p>
      )}
      {broker.reraNumber && (
        <div className="mono-label mt-2 text-[10.5px] text-good">RERA {broker.reraNumber}</div>
      )}

      <div className="mt-3.5 flex gap-2">
        <button
          type="button"
          onClick={() => setView(true)}
          className="flex-1 rounded-lg border border-line-strong py-2 text-[13px] font-semibold text-ink transition hover:border-brand"
        >
          View profile
        </button>
        <EnquiryModal
          profile={profile}
          broker={{
            brokerId: broker.brokerId,
            name: broker.fullName,
            categories: broker.categories,
          }}
          renderTrigger={(open) => (
            <button
              type="button"
              onClick={open}
              className="flex-1 rounded-lg bg-brand py-2 text-[13px] font-bold text-on-brand transition hover:bg-brand-strong"
            >
              Send enquiry
            </button>
          )}
        />
      </div>

      {view && (
        <BrokerViewDialog broker={broker} profile={profile} onClose={() => setView(false)} />
      )}
    </div>
  );
}

function BrokerViewDialog({
  broker,
  profile,
  onClose,
}: {
  broker: CompanyBroker;
  profile: ProfileDetail;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div className="directory-scope">
      <div
        className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 p-5 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        role="dialog"
        aria-modal="true"
      >
        <div className="max-h-[calc(100vh-40px)] w-full max-w-[420px] overflow-y-auto rounded-2xl border border-line bg-surface p-6 shadow-2xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar broker={broker} size={52} />
              <div>
                <h3 className="font-display text-[18px] font-bold tracking-tight">
                  {broker.fullName}
                </h3>
                <div className="mono-label mt-0.5 text-[10.5px] text-faint">
                  Broker at {profile.displayName}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="p-1 text-faint hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3 text-[13.5px]">
            {broker.reraNumber && (
              <Row label="RERA">
                <span className="inline-flex items-center gap-1.5 text-good">
                  <ShieldCheck className="h-4 w-4" /> {broker.reraNumber}
                </span>
              </Row>
            )}
            {broker.city && <Row label="City">{broker.city}</Row>}
            {typeof broker.yearsOfExperience === "number" && (
              <Row label="Experience">{broker.yearsOfExperience} years</Row>
            )}
            {broker.categories.length > 0 && (
              <Row label="Works on">
                <div className="flex flex-wrap gap-1.5">
                  {broker.categories.map((c) => (
                    <span
                      key={c}
                      className="mono-label rounded-md bg-brand-soft px-2 py-0.5 text-[10.5px] font-medium text-brand-ink"
                    >
                      {CATEGORY_LABEL[c]}
                    </span>
                  ))}
                </div>
              </Row>
            )}
            {broker.description && (
              <Row label="About">
                <p className="leading-relaxed text-dmuted">{broker.description}</p>
              </Row>
            )}
          </div>

          <EnquiryModal
            profile={profile}
            broker={{
              brokerId: broker.brokerId,
              name: broker.fullName,
              categories: broker.categories,
            }}
            renderTrigger={(open) => (
              <button
                type="button"
                onClick={open}
                className="mt-5 w-full rounded-lg bg-brand py-3 text-[15px] font-bold text-on-brand transition hover:bg-brand-strong"
              >
                Send an enquiry
              </button>
            )}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mono-label text-[10px] text-faint">{label}</div>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}
