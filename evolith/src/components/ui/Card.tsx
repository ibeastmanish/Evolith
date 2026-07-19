import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", padding = "md", className = "", children, ...props }, ref) => {
    const baseStyles = "rounded-[16px] transition-all duration-250";

    const variants: Record<string, string> = {
      default:
        "bg-[var(--ag-surface)] border border-[var(--ag-border)]",
      elevated:
        "bg-[var(--ag-surface-elevated)] border border-[var(--ag-border)]",
      interactive:
        "bg-[var(--ag-surface)] border border-[var(--ag-border)] hover:border-[var(--ag-border-hover)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)] cursor-pointer",
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
        className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
export default Card;
