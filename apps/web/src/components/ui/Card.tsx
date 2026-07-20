import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive" | "glass";
  padding?: "none" | "sm" | "md" | "lg";
  breathe?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", padding = "md", breathe = false, className = "", children, ...props }, ref) => {
    const base = "rounded-[20px] transition-all duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)]";

    const variants: Record<string, string> = {
      default:
        "bg-[var(--ev-surface)] border border-[var(--ev-border)]",
      elevated:
        "bg-[var(--ev-elevated)] border border-[var(--ev-border)]",
      interactive:
        "bg-[var(--ev-surface)] border border-[var(--ev-border)] hover:border-[var(--ev-border-hover)] hover:shadow-[var(--shadow-md)] hover:-translate-y-[2px] cursor-pointer",
      glass:
        "ev-glass",
    };

    const paddings: Record<string, string> = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          base,
          variants[variant],
          paddings[padding],
          breathe && "ev-breathe",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
export default Card;
