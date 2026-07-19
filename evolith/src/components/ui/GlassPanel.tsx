import { HTMLAttributes, forwardRef } from "react";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: "subtle" | "medium";
}

const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ intensity = "medium", className = "", children, ...props }, ref) => {
    const styles: Record<string, string> = {
      subtle: "glass-subtle",
      medium: "glass",
    };

    return (
      <div
        ref={ref}
        className={`rounded-[16px] ${styles[intensity]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";
export default GlassPanel;
