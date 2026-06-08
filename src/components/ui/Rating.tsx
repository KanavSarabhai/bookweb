import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}

export function Rating({ value, reviewCount, size = "sm", className }: RatingProps) {
  const iconSize = size === "sm" ? 13 : 15;

  return (
    <div className={cn("flex items-center gap-1.5", className)} aria-label={`Rated ${value} out of 5`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={iconSize}
            className={cn(
              i < Math.floor(value)
                ? "fill-brick text-brick"
                : i < value
                  ? "fill-brick/40 text-brick"
                  : "fill-none text-press-muted/30"
            )}
            aria-hidden
          />
        ))}
      </div>
      <span className="font-ui text-xs text-press-muted">
        {value.toFixed(1)}
        {reviewCount !== undefined && (
          <span className="text-press-muted/70"> ({reviewCount.toLocaleString()})</span>
        )}
      </span>
    </div>
  );
}
