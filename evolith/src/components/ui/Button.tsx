import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "accent" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ag-accent)] disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variants: Record<string, string> = {
      primary:
        "bg-white text-[#05070D] hover:bg-white/90 active:scale-[0.98]",
      secondary:
        "bg-[var(--ag-surface-elevated)] text-[var(--ag-text-primary)] border border-[var(--ag-border)] hover:border-[var(--ag-border-hover)] hover:bg-[var(--ag-surface-hover)] active:scale-[0.98]",
      ghost:
        "bg-transparent text-[var(--ag-text-secondary)] hover:text-[var(--ag-text-primary)] hover:bg-[var(--ag-surface-elevated)]",
      accent:
        "bg-[var(--ag-accent)] text-white hover:bg-[var(--ag-accent-hover)] active:scale-[0.98] shadow-[var(--shadow-glow-accent)]",
      danger:
        "bg-[var(--ag-error)] text-white hover:bg-[#DC2626] active:scale-[0.98]",
    };

    const sizes: Record<string, string> = {
      sm: "text-xs px-3 py-1.5 h-8",
      md: "text-sm px-4 py-2 h-9",
      lg: "text-base px-6 py-2.5 h-11",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
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
