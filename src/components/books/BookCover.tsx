import type { Book } from "@/types/book";
import { cn } from "@/lib/utils";

interface BookCoverProps {
  book: Pick<Book, "title" | "author" | "coverColor" | "coverAccent">;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  priority?: boolean;
}

const sizeClasses = {
  sm: "h-44 w-32",
  md: "h-56 w-40",
  lg: "h-72 w-52",
  xl: "h-80 w-56",
};

export function BookCover({ book, size = "md", className }: BookCoverProps) {
  const words = book.title.split(" ").slice(0, 4);
  const titleLine = words.slice(0, 2).join(" ");
  const subtitle = words.slice(2).join(" ");

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-sm shadow-md transition-shadow duration-300 group-hover:shadow-lg",
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: book.coverColor }}
      role="img"
      aria-label={`Cover of ${book.title}`}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(135deg, ${book.coverAccent}40 0%, transparent 60%)`,
        }}
      />
      <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: book.coverAccent }} />
      <div className="flex h-full flex-col justify-between p-3">
        <span
          className="font-ui text-[0.6rem] font-semibold uppercase tracking-widest opacity-70"
          style={{ color: book.coverAccent }}
        >
          Technical
        </span>
        <div>
          <p
            className="font-ui text-[0.6875rem] leading-tight font-semibold"
            style={{ color: book.coverAccent }}
          >
            {titleLine}
          </p>
          {subtitle && (
            <p
              className="font-ui mt-0.5 text-[0.625rem] leading-tight opacity-80"
              style={{ color: book.coverAccent }}
            >
              {subtitle}
            </p>
          )}
          <p
            className="font-ui mt-2 text-[0.625rem] opacity-60"
            style={{ color: book.coverAccent }}
          >
            {book.author.split(",")[0]}
          </p>
        </div>
      </div>
      <div
        className="absolute right-0 top-0 bottom-0 w-1.5 opacity-30"
        style={{ backgroundColor: book.coverAccent }}
      />
    </div>
  );
}
