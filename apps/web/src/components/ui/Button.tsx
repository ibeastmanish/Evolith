import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "accent" | "glass" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-medium select-none rounded-[12px] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ev-accent)] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants: Record<string, string> = {
      primary:
        "bg-white text-[#050608] hover:bg-white/90 active:scale-[0.97]",
      secondary:
        "bg-[var(--ev-elevated)] text-[var(--ev-text)] border border-[var(--ev-border)] hover:border-[var(--ev-border-hover)] hover:bg-[var(--ev-card)] active:scale-[0.97]",
      ghost:
        "bg-transparent text-[var(--ev-text-secondary)] hover:text-[var(--ev-text)] hover:bg-[var(--ev-elevated)]",
      accent:
        "bg-[var(--ev-accent)] text-white hover:bg-[var(--ev-accent-hover)] active:scale-[0.97] shadow-[var(--shadow-glow-accent)]",
      glass:
        "ev-glass text-[var(--ev-text)] hover:bg-[rgba(255,255,255,0.08)] active:scale-[0.97]",
      danger:
        "bg-[var(--ev-danger)] text-white hover:bg-[#DC2626] active:scale-[0.97]",
    };

    const sizes: Record<string, string> = {
      sm: "text-xs px-3 py-1.5 h-8",
      md: "text-sm px-4 py-2 h-9",
      lg: "text-[0.9375rem] px-6 py-2.5 h-11",
    };

    const motion = "duration-[120ms] ease-out hover:-translate-y-[1px]";

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], motion, className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
