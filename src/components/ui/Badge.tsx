import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "sale" | "muted";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block font-ui text-[0.625rem] font-medium uppercase tracking-wide px-2 py-0.5 rounded-[3.75px]",
        variant === "default" && "border border-brick text-brick bg-cream",
        variant === "sale" && "bg-brick text-cream border border-brick",
        variant === "muted" && "border border-press/20 text-press-muted bg-cream",
        className
      )}
    >
      {children}
    </span>
  );
}
