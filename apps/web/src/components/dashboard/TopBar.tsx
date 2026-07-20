"use client";

import Badge from "@/components/ui/Badge";

export default function TopBar() {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-[var(--ag-border)] bg-[var(--ag-surface)]">
      {/* Search */}
      <button
        className="flex items-center gap-3 px-4 py-2 rounded-[10px] bg-[var(--ag-surface-elevated)] border border-[var(--ag-border)] hover:border-[var(--ag-border-hover)] transition-colors text-sm text-[var(--ag-text-muted)] w-72"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
        <span>Search research…</span>
        <span className="ml-auto text-xs text-[var(--ag-text-muted)] border border-[var(--ag-border)] rounded px-1.5 py-0.5">
          ⌘K
        </span>
      </button>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* AI Status */}
        <Badge variant="default">
          <div className="w-2 h-2 rounded-full bg-[var(--ag-success)]" />
          AI Online
        </Badge>

        {/* Mode indicator */}
        <Badge variant="research">Research Mode</Badge>
      </div>
    </header>
  );
}
