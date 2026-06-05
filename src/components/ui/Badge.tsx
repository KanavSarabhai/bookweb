import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "muted";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block font-ui text-[0.6875rem] font-medium uppercase tracking-wide px-2 py-0.5 rounded-sm",
        variant === "default" && "bg-cream text-brown border border-border",
        variant === "gold" && "bg-beige/60 text-brown border border-gold-subtle/40",
        variant === "muted" && "bg-ivory text-charcoal-muted border border-border",
        className
      )}
    >
      {children}
    </span>
  );
}
