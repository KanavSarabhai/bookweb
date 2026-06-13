import type { Book } from "@/types/book";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface BookCoverProps {
  book: Pick<Book, "title" | "author" | "coverColor" | "coverAccent" | "coverUrl">;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "h-44 w-32",
  md: "h-56 w-40",
  lg: "h-72 w-52",
  xl: "h-[380px] w-full lg:h-[560px] lg:w-[420px]", // specific sizes for product detail
};

export function BookCover({ book, size = "md", className }: BookCoverProps) {
  const hasCover = Boolean(book.coverUrl);

  if (hasCover && book.coverUrl) {
    return (
      <div 
        className={cn(
          "relative shrink-0 overflow-hidden flex items-center justify-center bg-[#F8F5F0]", 
          sizeClasses[size], 
          size === "xl" ? "rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 lg:p-8" : "",
          className
        )}
      >
        <Image
          src={book.coverUrl}
          alt={`${book.title} cover`}
          fill
          className={cn("object-contain", size === "xl" ? "p-4 lg:p-8" : "p-2")}
          sizes={
            size === "xl" ? "(max-width: 1024px) 100vw, 420px" :
            size === "lg" ? "208px" :
            size === "md" ? "160px" : "128px"
          }
          quality={size === "xl" ? 90 : 75}
        />
      </div>
    );
  }

  const words = book.title.split(" ").slice(0, 4);
  const titleLine = words.slice(0, 2).join(" ");
  const subtitle = words.slice(2).join(" ");

  return (
    <div
      className={cn("relative shrink-0 overflow-hidden", sizeClasses[size], className)}
      style={{ backgroundColor: book.coverColor ?? "#2a2a2a" }}
      role="img"
      aria-label={`Cover of ${book.title}`}
    >
      <div
        className="absolute inset-x-0 top-0 h-0.5"
        style={{ backgroundColor: book.coverAccent ?? "#fff" }}
      />
      <div className="flex h-full flex-col justify-between p-3">
        <span
          className="font-ui text-[0.55rem] font-medium uppercase tracking-widest opacity-60"
          style={{ color: book.coverAccent ?? "#fff" }}
        >
          Technical
        </span>
        <div>
          <p
            className="font-ui text-[0.65rem] leading-tight font-semibold"
            style={{ color: book.coverAccent ?? "#fff" }}
          >
            {titleLine}
          </p>
          {subtitle && (
            <p
              className="font-ui mt-0.5 text-[0.6rem] leading-tight opacity-75"
              style={{ color: book.coverAccent ?? "#fff" }}
            >
              {subtitle}
            </p>
          )}
          <p
            className="font-ui mt-2 text-[0.55rem] opacity-50"
            style={{ color: book.coverAccent ?? "#fff" }}
          >
            {book.author.split(",")[0]}
          </p>
        </div>
      </div>
    </div>
  );
}
