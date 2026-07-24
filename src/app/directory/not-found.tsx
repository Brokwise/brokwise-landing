import Link from "next/link";

export default function NotFound() {
  return (
    <main className="directory-scope mx-auto flex min-h-screen max-w-[1160px] flex-col items-center bg-paper px-6 py-24 text-center text-ink">
      <div className="mono-label text-[11.5px] font-semibold text-brand-ink">404</div>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Profile not found</h1>
      <p className="mt-3 max-w-[40ch] text-dmuted">
        This directory profile may have been moved or is no longer listed.
      </p>
      <Link
        href="/directory"
        className="mt-6 rounded-lg bg-brand px-5 py-3 text-[15px] font-bold text-on-brand hover:bg-brand-strong"
      >
        Browse all brokers
      </Link>
    </main>
  );
}
