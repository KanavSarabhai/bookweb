import { ActionLink } from "@/components/ui/ActionLink";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "text";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
  pill?: boolean;
}

const sizes: Record<ButtonSize, string> = {
  sm: "text-xs px-4 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-sm px-6 py-3",
};

export function Button({
  variant = "outline",
  size = "md",
  href,
  className,
  children,
  pill,
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  const linkVariant = variant === "text" || variant === "ghost" ? "text" : "outline";

  if (href) {
    return (
      <ActionLink
        href={href}
        variant={linkVariant}
        pill={pill}
        className={cn(sizes[size], className)}
      >
        {children}
      </ActionLink>
    );
  }

  return (
    <ActionLink
      type={type}
      variant={linkVariant}
      pill={pill}
      className={cn(sizes[size], className)}
      onClick={onClick}
      ariaLabel={props["aria-label"]}
    >
      {children}
    </ActionLink>
  );
}
