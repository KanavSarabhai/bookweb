"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { HeroBook } from "@/lib/data/hero-books";

/* ─── Per-book perspective + float config ─────────────── */
const BOOK_CONFIG = [
  { rotateY: -7,  rotateZ: -0.9, z: 2, floatFrom: 10, floatDuration: 5.2, delay: 0.10 },
  { rotateY: -2,  rotateZ: -0.2, z: 4, floatFrom: 4,  floatDuration: 5.6, delay: 0.20 },
  { rotateY:  2,  rotateZ:  0.2, z: 4, floatFrom: 4,  floatDuration: 5.4, delay: 0.30 },
  { rotateY:  7,  rotateZ:  0.9, z: 2, floatFrom: 10, floatDuration: 5.8, delay: 0.40 },
] as const;

/* ─── Book dimensions ─────────────────────────────────── */
// Desktop (≥1280px): 210 × 310px
// Tablet  (≥768px):  165 × 244px
// Mobile  (<768px):  128 × 190px
const W = "clamp(128px, 13.5vw, 210px)";
const H = "clamp(190px, 20vw,  310px)";

/* ─── Shadows ─────────────────────────────────────────── */
const SHADOW_REST =
  "0 1px 2px rgba(0,0,0,0.04), 0 6px 12px rgba(0,0,0,0.07), 0 20px 44px rgba(0,0,0,0.10), 0 40px 72px rgba(0,0,0,0.07)";
const SHADOW_HOVER =
  "0 2px 4px rgba(0,0,0,0.06), 0 12px 24px rgba(0,0,0,0.12), 0 32px 64px rgba(0,0,0,0.16), 0 56px 96px rgba(0,0,0,0.10)";

interface Props {
  books: HeroBook[];
}

/* ─────────────────────────────────────────────────────── */
/* Single book                                             */
/* ─────────────────────────────────────────────────────── */
function Book({
  book,
  idx,
  cfg,
  reduced,
}: {
  book: HeroBook;
  idx: number;
  cfg: (typeof BOOK_CONFIG)[number];
  reduced: boolean;
}) {
  return (
    <motion.li
      className="relative shrink-0 list-none"
      style={{ zIndex: cfg.z }}
      /* stagger entrance */
      initial={reduced ? false : { opacity: 0, y: 56, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.95, delay: cfg.delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* floating loop wrapper */}
      <motion.div
        animate={
          reduced ? {} : { y: [cfg.floatFrom, cfg.floatFrom - 12, cfg.floatFrom] }
        }
        transition={
          reduced
            ? {}
            : {
                duration: cfg.floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.6,
              }
        }
        whileHover={
          reduced
            ? {}
            : {
                y: cfg.floatFrom - 18,
                scale: 1.03,
                transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
              }
        }
        className="group"
        style={{
          transform: `perspective(1400px) rotateY(${cfg.rotateY}deg) rotateZ(${cfg.rotateZ}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <Link
          href={`/books/${book.slug}`}
          aria-label={`${book.title} by ${book.author}`}
          className="block rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E82C2A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAF7F2]"
        >
          {/* ── Cover ── */}
          <div
            className="relative rounded-[8px] overflow-hidden"
            style={{
              width: W,
              height: H,
              boxShadow: SHADOW_REST,
              transition: "box-shadow 0.35s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLDivElement).style.boxShadow = SHADOW_HOVER)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLDivElement).style.boxShadow = SHADOW_REST)
            }
          >
            <Image
              src={book.coverUrl}
              alt={`${book.title} cover`}
              fill
              sizes="(max-width: 640px) 128px, (max-width: 1024px) 165px, 210px"
              className="object-contain object-center"
              quality={95}
              priority={idx < 2}
            />

            {/* Gloss sheen — upper-left highlight */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[8px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.06) 30%, transparent 55%, rgba(0,0,0,0.03) 100%)",
              }}
              aria-hidden
            />
            {/* Edge ring */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[8px] ring-1 ring-inset ring-black/[0.08]"
              aria-hidden
            />
          </div>

          {/* Ground shadow blob */}
          <div
            className="mx-auto mt-3 rounded-[50%] blur-[10px] opacity-[0.22] transition-opacity duration-300 group-hover:opacity-35"
            style={{ width: "74%", height: 12, background: "rgba(15,8,0,0.55)" }}
            aria-hidden
          />
        </Link>
      </motion.div>
    </motion.li>
  );
}

/* ─────────────────────────────────────────────────────── */
/* Showcase — books + podium in normal flow               */
/* ─────────────────────────────────────────────────────── */
export function HeroBookShowcase({ books }: Props) {
  const reduced = useReducedMotion();

  return (
    /*
     * Outer: centres horizontally, no overflow clipping.
     * Inner: flex-col → [glow absolute] + books-row + podium.
     * Everything sits in normal document flow → podium is always flush
     * under the books, no absolute positioning hacks required.
     */
    <div className="w-full max-w-[760px] flex flex-col items-center py-8 lg:py-12 select-none">

      <div className="relative flex flex-col items-center w-full">

        {/* ── Soft warm glow — absolute, zero layout impact ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(100%, 640px)",
            height: "380px",
            background:
              "radial-gradient(ellipse 78% 68% at 50% 44%, rgba(255,250,243,1) 0%, rgba(240,228,208,0.55) 46%, transparent 74%)",
            filter: "blur(3px)",
          }}
          aria-hidden
        />
        {/* Brick-red tint at center — very subtle */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(100%, 440px)",
            height: "260px",
            background:
              "radial-gradient(ellipse 58% 52% at 50% 40%, rgba(232,44,42,0.04) 0%, transparent 70%)",
          }}
          aria-hidden
        />

        {/* ── Books row ── */}
        <ul
          className="relative z-10 flex items-end justify-center gap-[10px] sm:gap-[14px] lg:gap-[16px] m-0 p-0"
          aria-label="Featured books"
        >
          {books.slice(0, 4).map((book, i) => (
            <Book
              key={book.slug}
              book={book}
              idx={i}
              cfg={BOOK_CONFIG[i]}
              reduced={!!reduced}
            />
          ))}
        </ul>

        {/* ── Podium — directly below books in normal flow ── */}
        <motion.div
          className="relative z-0 mt-[-4px] w-full max-w-[720px] px-3 lg:px-4"
          initial={reduced ? false : { opacity: 0, scaleX: 0.65 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.15, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "center" }}
          aria-hidden
        >
          {/* Main oval surface */}
          <div
            className="w-full rounded-[50%]"
            style={{
              height: "clamp(90px, 10.5vw, 148px)",
              background:
                "linear-gradient(180deg, #FAF4EA 0%, #F0E2CC 28%, #E4D0B4 62%, #D6C09E 100%)",
              boxShadow: [
                "0 -3px 0 rgba(255,255,255,0.85) inset",
                "0 3px 8px rgba(0,0,0,0.04)",
                "0 16px 48px rgba(0,0,0,0.07)",
                "0 36px 80px rgba(0,0,0,0.05)",
              ].join(", "),
            }}
          />
          {/* Ambient shadow beneath the podium */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-[50%] blur-3xl opacity-25"
            style={{
              top: "55%",
              width: "68%",
              height: "28%",
              background: "rgba(15,8,0,0.30)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
