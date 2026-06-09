"use client";

import Link from "next/link";
import { categories } from "@/lib/data/categories";

const iconPaths: Record<string, string> = {
  brain: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z",
  network: "M17 8C8 10 5.9 16.17 3.82 22H5.71c.91-2.49 2.48-5.49 5.69-7.5C13.91 16.5 16 19.25 17 22h2c-1-4-4.69-6.51-7.5-7.5C13.47 12.77 14.81 11 17 8z M12 2C9.24 2 7 4.24 7 7s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z",
  chart: "M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z",
  code: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
  shield: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
  cloud: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z",
  layers: "M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z",
  cpu: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
  briefcase: "M20 6h-2.18c.07-.44.18-.88.18-1.36C18 3.14 16.86 2 15.5 2h-7C7.14 2 6 3.14 6 4.64c0 .48.11.92.18 1.36H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm1.5-8h-3C9.67 9 9 8.33 9 7.5s.67-1.5 1.5-1.5h3c.83 0 1.5.67 1.5 1.5S13.33 9 12.5 9z",
  wrench: "M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z",
  book: "M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z",
};

const tones = [
  { bg: "#fff8f4", accent: "#c46a3a" },
  { bg: "#f5f8ff", accent: "#4a6fa5" },
  { bg: "#f5fff7", accent: "#3a8a5a" },
  { bg: "#fdfbf0", accent: "#8a7a2a" },
  { bg: "#fff4f8", accent: "#a43a6a" },
  { bg: "#f0f9ff", accent: "#2a7a9a" },
  { bg: "#fff9f0", accent: "#b07030" },
  { bg: "#f5f0ff", accent: "#6a4aa5" },
];

export function CategoriesPageClient() {
  return (
    <div style={{ background: "var(--surface)", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(160deg, #f8f5f0 0%, #f0e8da 100%)", paddingTop: "80px", paddingBottom: "60px", borderBottom: "1px solid var(--border)" }}>
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <p className="eyebrow mb-5">Browse</p>
          <h1 className="font-display font-normal leading-[1.06] tracking-[-0.03em] mb-5" style={{ fontSize: "clamp(2.8rem, 6vw + 0.5rem, 6.5rem)", color: "var(--ink)", maxWidth: "700px" }}>
            Explore Categories
          </h1>
          <p className="font-ui text-[1.0625rem] leading-[1.75]" style={{ color: "var(--ink-muted)", maxWidth: "500px" }}>
            From artificial intelligence to academic textbooks — every subject the modern builder needs.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16 py-14 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((cat, i) => {
            const tone = tones[i % tones.length];
            const svgPath = iconPaths[cat.icon ?? "book"] ?? iconPaths["book"];
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group relative flex flex-col p-7 rounded-[20px] overflow-hidden"
                style={{ background: "#fff", border: "1px solid #f0ece6", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)", textDecoration: "none", transition: "box-shadow 0.3s ease, transform 0.3s ease" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.10)"; el.style.transform = "translateY(-5px)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)"; el.style.transform = "translateY(0)"; }}
              >
                <div className="inline-flex items-center justify-center size-12 rounded-[14px] mb-5" style={{ background: tone.bg }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill={cat.icon === "cpu" ? "none" : tone.accent} stroke={cat.icon === "cpu" ? tone.accent : "none"} strokeWidth={cat.icon === "cpu" ? 1.5 : 0} aria-hidden>
                    <path d={svgPath} />
                  </svg>
                </div>
                <h2 className="font-ui text-base font-semibold leading-snug mb-2" style={{ color: "var(--ink)" }}>{cat.name}</h2>
                <p className="font-ui text-[0.875rem] leading-[1.65] flex-1" style={{ color: "var(--ink-muted)" }}>{cat.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-ui text-[0.75rem] font-medium" style={{ color: tone.accent }}>{cat.bookCount.toLocaleString()}+ titles</span>
                  <span className="font-ui text-[0.75rem] font-medium transition-all duration-200 group-hover:translate-x-1 inline-block" style={{ color: tone.accent }}>Browse →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
