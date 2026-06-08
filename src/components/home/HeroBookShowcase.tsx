"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { HeroBook } from "@/lib/data/hero-books";

const layout = [
  { offset: -150, z: 40, rotateY: 12, scale: 1.06 },
  { offset: -50, z: 12, rotateY: 6, scale: 0.94 },
  { offset: 50, z: 40, rotateY: -6, scale: 1.06 },
  { offset: 150, z: 12, rotateY: -12, scale: 0.94 },
];

interface HeroBookShowcaseProps {
  books: HeroBook[];
}

function ShowcaseBook({
  book,
  index,
  layoutConfig,
  reducedMotion,
}: {
  book: HeroBook;
  index: number;
  layoutConfig: (typeof layout)[0];
  reducedMotion: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="absolute bottom-[18%]"
      style={{
        left: `calc(50% + ${layoutConfig.offset}px)`,
        zIndex: layoutConfig.z,
        x: "-50%",
      }}
      initial={reducedMotion ? false : { opacity: 0, y: 56 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.85,
        delay: 0.15 + index * 0.12,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
    >
      <motion.div
        animate={reducedMotion ? {} : { y: [0, -8, 0] }}
        transition={
          reducedMotion
            ? {}
            : {
                duration: 4.8 + index * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.4,
              }
        }
        whileHover={
          reducedMotion
            ? {}
            : {
                y: -12,
                scale: 1.03,
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              }
        }
      >
        <Link
          href={`/books/${book.slug}`}
          className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brick rounded-sm"
          aria-label={`${book.title} by ${book.author}`}
        >
          <div
            className="relative"
            style={{
              transform: `perspective(1400px) rotateY(${layoutConfig.rotateY}deg) scale(${layoutConfig.scale})`,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="relative w-[118px] sm:w-[132px] lg:w-[148px] xl:w-[158px] aspect-[2/3] rounded-r-[3px] overflow-hidden transition-shadow duration-300 group-hover:shadow-2xl"
              style={{
                boxShadow:
                  "0 4px 6px rgba(18,18,18,0.04), 0 18px 40px rgba(18,18,18,0.14), 0 40px 80px rgba(18,18,18,0.08)",
              }}
            >
              {!imgError ? (
                <Image
                  src={book.coverUrl}
                  alt={`${book.title} cover`}
                  fill
                  sizes="(max-width: 768px) 118px, 158px"
                  className="object-cover"
                  priority={index < 2}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  className="absolute inset-0 flex flex-col justify-end p-3"
                  style={{ backgroundColor: book.spineColor }}
                >
                  <p className="font-ui text-[0.6rem] font-medium text-white/90 leading-tight line-clamp-3">
                    {book.title}
                  </p>
                </div>
              )}
              <div
                className="absolute inset-y-0 left-0 w-[6px]"
                style={{
                  background: `linear-gradient(90deg, ${book.spineColor}, ${book.spineColor}dd)`,
                  boxShadow: "inset -2px 0 4px rgba(0,0,0,0.25)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />
            </div>
            <div
              className="absolute -bottom-3 left-[8%] right-[8%] h-3 rounded-[50%] blur-md opacity-40"
              style={{ background: "rgba(18,18,18,0.35)" }}
              aria-hidden
            />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function HeroBookShowcase({ books }: HeroBookShowcaseProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-0 flex items-end justify-center overflow-visible">
      <div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[min(100%,520px)] h-[65%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,255,255,0.85) 0%, rgba(248,246,243,0.4) 45%, transparent 72%)",
        }}
        aria-hidden
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 75%, rgba(232,44,42,0.03) 0%, transparent 55%)",
        }}
        aria-hidden
      />

      <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[min(92%,480px)] pointer-events-none">
        <div
          className="w-full h-[72px] sm:h-[88px] lg:h-[100px] rounded-[50%]"
          style={{
            background:
              "linear-gradient(180deg, #f3f0eb 0%, #ebe6df 55%, #e2dcd3 100%)",
            boxShadow:
              "0 2px 4px rgba(18,18,18,0.03), 0 20px 60px rgba(18,18,18,0.08), inset 0 2px 0 rgba(255,255,255,0.6)",
          }}
          aria-hidden
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] w-[75%] h-[40%] rounded-[50%] blur-2xl opacity-50"
          style={{ background: "rgba(18,18,18,0.06)" }}
          aria-hidden
        />
      </div>

      <div className="relative w-full h-[88%] max-w-[560px] mx-auto">
        {books.map((book, i) => (
          <ShowcaseBook
            key={book.slug}
            book={book}
            index={i}
            layoutConfig={layout[i]}
            reducedMotion={!!reducedMotion}
          />
        ))}
      </div>
    </div>
  );
}
