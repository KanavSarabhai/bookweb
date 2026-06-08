import Link from "next/link";
import { cn } from "@/lib/utils";

interface ActionLinkProps {
  href?: string;
  children: React.ReactNode;
  variant?: "outline" | "text";
  pill?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

export function ActionLink({
  href,
  children,
  variant = "outline",
  pill = false,
  className,
  onClick,
  type = "button",
  ariaLabel,
}: ActionLinkProps) {
  const classes = cn(
    "inline-flex items-center gap-2 font-ui text-sm font-medium transition-opacity duration-200 hover:opacity-70",
    variant === "outline" &&
      "border border-brick text-brick bg-transparent px-5 py-2.5",
    variant === "text" && "text-brick px-0 py-1 border-0",
    pill ? "rounded-[50px]" : "rounded-[3.75px]",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
