interface BadgeProps {
  variant?: "research" | "discovery" | "verified" | "unverified" | "contradicted" | "default";
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = "default", children, icon, className = "" }: BadgeProps) {
  const variants: Record<string, string> = {
    default:
      "bg-[var(--ag-surface-elevated)] text-[var(--ag-text-secondary)] border border-[var(--ag-border)]",
    research: "badge-research",
    discovery: "badge-discovery",
    verified: "badge-verified",
    unverified: "badge-unverified",
    contradicted: "badge-contradicted",
  };

  return (
    <span className={`badge ${variants[variant]} ${className}`}>
      {icon}
      {children}
    </span>
  );
}
