import {
  ShieldCheck,
  Lock,
  Share2,
  Target,
  Cpu,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { FEATURES } from "./content";

const ICON_MAP: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  lock: Lock,
  network: Share2,
  target: Target,
  cpu: Cpu,
  "trending-up": TrendingUp,
};

export default function Features() {
  return (
    <section id="features" className="bg-v2-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="text-center font-display text-3xl font-bold leading-tight tracking-tight text-v2-ink md:text-5xl">
          Why serious brokers choose Brokwise.
        </h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {FEATURES.map((f) => {
            const Icon = ICON_MAP[f.icon] ?? ShieldCheck;
            return (
              <div
                key={f.title}
                className="rounded-3xl border border-black/5 bg-v2-paper-2 p-7 text-center transition-shadow hover:shadow-[0_16px_40px_-24px_rgba(11,21,34,0.35)]"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-v2-gold text-v2-ink">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="mb-2.5 font-display text-lg font-bold text-v2-ink">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-v2-ink/60">{f.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
