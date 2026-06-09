"use client";

import Link from "next/link";

const programs = [
  {
    icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    title: "Retail Partnership",
    description: "Stock our curated catalogue of technical, professional, and academic titles. Access exclusive trade pricing, marketing materials, and dedicated account support.",
    cta: "Apply as retailer", href: "/contact",
  },
  {
    icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
    title: "Distributor Program",
    description: "Join our distribution network and bring world-class technical books to your region. We work with regional distributors across India with flexible terms.",
    cta: "Start distributing", href: "/contact",
  },
  {
    icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
    title: "Institutional Orders",
    description: "Special pricing for colleges, universities, training institutes, and corporate buyers. Bulk ordering with custom invoicing and delivery arrangements.",
    cta: "Request a quote", href: "/contact",
  },
  {
    icon: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
    title: "Global Publishers",
    description: "We represent O'Reilly, Manning, Pragmatic Bookshelf, No Starch Press, Wiley, Packt, and dozens more — giving you a single trusted source for technical titles.",
    cta: "View publishers", href: "/publishers",
  },
];

const benefits = [
  { label: "50+", sub: "Publisher partners" },
  { label: "10,000+", sub: "Active titles" },
  { label: "25 yrs", sub: "In the industry" },
  { label: "Pan-India", sub: "Distribution network" },
];

export function RetailersPageClient() {
  return (
    <div style={{ background: "var(--surface)", minHeight: "100vh" }}>
      {/* Dark hero */}
      <div style={{ background: "linear-gradient(150deg, #1a1510 0%, #2a1e14 55%, #1e1a10 100%)", paddingTop: "100px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 80% 60% at 65% 40%, rgba(196,106,58,0.12) 0%, transparent 70%)" }} />
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <p className="font-ui text-[0.68rem] font-semibold uppercase tracking-[0.20em] mb-6" style={{ color: "#c46a3a" }}>Partnerships</p>
          <h1 className="font-display font-normal leading-[1.04] tracking-[-0.03em] mb-6" style={{ fontSize: "clamp(2.8rem, 6vw, 6.5rem)", color: "#f8f5f0", maxWidth: "780px" }}>
            Grow your business with trusted technical titles
          </h1>
          <p className="font-ui text-[1.0625rem] leading-[1.78] mb-10" style={{ color: "rgba(248,245,240,0.6)", maxWidth: "520px" }}>
            Shroff Publishers & Distributors supplies technical, professional, and academic books to bookstores, colleges, training institutes, and corporate buyers across India.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center font-ui text-[0.9rem] font-medium px-7 py-[14px] rounded-full" style={{ background: "#c46a3a", color: "#fff" }}>Become a partner</Link>
            <a href="mailto:mail@shroffpublishers.com" className="inline-flex items-center font-ui text-[0.9rem] font-medium px-7 py-[13px] rounded-full" style={{ background: "rgba(255,255,255,0.08)", color: "#f8f5f0", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>Email us directly</a>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border)" }}>
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, bi) => (
              <div key={b.label} className="px-8 py-8 text-center" style={{ borderRight: bi < 3 ? "1px solid var(--border)" : "none" }}>
                <p className="font-display font-normal leading-none tracking-[-0.03em] mb-1.5" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "var(--ink)" }}>{b.label}</p>
                <p className="font-ui text-[0.8125rem]" style={{ color: "var(--ink-muted)" }}>{b.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Programs */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24">
        <div className="mb-14">
          <p className="eyebrow mb-4">What we offer</p>
          <h2 className="font-display font-normal leading-[1.06] tracking-[-0.025em]" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--ink)", maxWidth: "560px" }}>
            Partnership programs built for growth
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-5">
          {programs.map((prog, i) => (
            <div key={prog.title} className="flex flex-col p-8 rounded-[24px]"
              style={{
                background: i === 0 ? "#161616" : "#fff",
                border: "1px solid",
                borderColor: i === 0 ? "transparent" : "var(--border-subtle)",
                boxShadow: i === 0 ? "0 4px 24px rgba(0,0,0,0.20)" : "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
                minHeight: i === 0 ? "300px" : "auto",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = i === 0 ? "0 8px 40px rgba(0,0,0,0.30)" : "0 2px 8px rgba(0,0,0,0.07), 0 16px 40px rgba(0,0,0,0.10)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = i === 0 ? "0 4px 24px rgba(0,0,0,0.20)" : "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)"; }}
            >
              <div className="inline-flex items-center justify-center size-12 rounded-[14px] mb-6" style={{ background: i === 0 ? "rgba(196,106,58,0.16)" : "rgba(196,106,58,0.08)", color: "#c46a3a" }}>{prog.icon}</div>
              <h3 className="font-ui text-[1.1rem] font-semibold leading-snug mb-3" style={{ color: i === 0 ? "#f8f5f0" : "var(--ink)" }}>{prog.title}</h3>
              <p className="font-ui text-[0.9375rem] leading-[1.72] flex-1 mb-6" style={{ color: i === 0 ? "rgba(248,245,240,0.6)" : "var(--ink-muted)" }}>{prog.description}</p>
              <Link href={prog.href} className="inline-flex items-center font-ui text-[0.875rem] font-medium gap-1.5 hover:opacity-70 transition-opacity" style={{ color: "#c46a3a" }}>{prog.cta} <span aria-hidden>→</span></Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <div style={{ background: "linear-gradient(135deg, #f0e8da 0%, #e8ddd0 100%)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div>
              <h2 className="font-display font-normal leading-[1.06] tracking-[-0.025em] mb-3" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "var(--ink)" }}>Ready to get started?</h2>
              <p className="font-ui text-[0.9375rem]" style={{ color: "var(--ink-muted)", maxWidth: "440px" }}>Talk to our partnerships team about wholesale pricing, institutional programs, or distribution.</p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <Link href="/contact" className="inline-flex items-center font-ui text-[0.9rem] font-medium px-7 py-[14px] rounded-full" style={{ background: "#161616", color: "#fff" }}>Contact us</Link>
              <a href="mailto:mail@shroffpublishers.com" className="inline-flex items-center font-ui text-[0.9rem] font-medium px-7 py-[13px] rounded-full" style={{ background: "transparent", color: "var(--ink)", border: "1px solid rgba(22,22,22,0.18)" }}>mail@shroffpublishers.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
