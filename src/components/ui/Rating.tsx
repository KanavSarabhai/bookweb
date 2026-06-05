import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  reviewCount?: number;
  size?: "sm" | "md";
  className?: string;
}

export function Rating({ value, reviewCount, size = "sm", className }: RatingProps) {
  const iconSize = size === "sm" ? 14 : 16;

  return (
    <div className={cn("flex items-center gap-1.5", className)} aria-label={`Rated ${value} out of 5`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={iconSize}
            className={cn(
              i < Math.floor(value)
                ? "fill-gold text-gold"
                : i < value
                  ? "fill-gold/50 text-gold"
                  : "fill-none text-border"
            )}
            aria-hidden
          />
        ))}
      </div>
      <span className="font-ui text-charcoal-muted text-xs">
        {value.toFixed(1)}
        {reviewCount !== undefined && (
          <span className="text-charcoal-muted/70"> ({reviewCount.toLocaleString()})</span>
        )}
      </span>
    </div>
  );
}
