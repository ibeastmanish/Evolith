interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({ icon, title, description, action, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}>
      {icon && (
        <div className="mb-4 text-[var(--ag-text-muted)]">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-[var(--ag-text-primary)] mb-2 font-[family-name:var(--font-heading)]">
        {title}
      </h3>
      <p className="text-sm text-[var(--ag-text-tertiary)] max-w-sm mb-6">
        {description}
      </p>
      {action}
    </div>
  );
}
