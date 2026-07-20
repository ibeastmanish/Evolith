/* ========================================
   EVOLITH — CONSTANTS & DESIGN LANGUAGE
   ======================================== */

export const SITE_CONFIG = {
  name: "Evolith",
  tagline: "The Living Atlas of Human Knowledge",
  description: "Explore how technology evolves. Trace the origins, connections, and future of every breakthrough.",
  github: "https://github.com/ibeastmanish/Evolith",
} as const;

/* ── Terminology ── */
export const TERMINOLOGY = {
  search: "Investigate",
  graph: "Knowledge Universe",
  timeline: "Time Machine",
  assistant: "Research Partner",
  dashboard: "Mission Control",
  compare: "Parallel Evolution",
  workspace: "Investigation",
  replay: "Knowledge Replay",
} as const;

/* ── Colors ── */
export const colors = {
  background: "#050608",
  surface: "#0D1117",
  elevated: "#151B26",
  card: "#1A2233",
  accent: "#4F8CFF",
  accentHover: "#6BA0FF",
  accentSecondary: "#8B5CF6",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  text: "#F9FAFB",
  textSecondary: "#9CA3AF",
  textTertiary: "#6B7280",
  textMuted: "#4B5563",
} as const;

/* ── Node Types & Colors ── */
export type NodeType = "technology" | "paper" | "company" | "person" | "dataset" | "patent";

export const nodeColors: Record<NodeType, string> = {
  technology: "#4F8CFF",
  paper: "#F59E0B",
  company: "#22C55E",
  person: "#8B5CF6",
  dataset: "#EC4899",
  patent: "#06B6D4",
} as const;

export const nodeLabels: Record<NodeType, string> = {
  technology: "Technology",
  paper: "Paper",
  company: "Company",
  person: "Person",
  dataset: "Dataset",
  patent: "Patent",
} as const;

export const nodeIcons: Record<NodeType, string> = {
  technology: "cpu",
  paper: "file-text",
  company: "building-2",
  person: "user",
  dataset: "database",
  patent: "shield-check",
} as const;

/* ── Edge Types ── */
export type EdgeType =
  | "INSPIRED_BY"
  | "INFLUENCED"
  | "CREATED_BY"
  | "REFERENCES"
  | "COMPETES_WITH"
  | "FORKED_FROM"
  | "PRECEDED_BY"
  | "SUCCEEDED_BY"
  | "AUTHORED"
  | "EMPLOYED"
  | "FUNDED"
  | "PUBLISHED";

export const edgeLabels: Record<EdgeType, string> = {
  INSPIRED_BY: "Inspired by",
  INFLUENCED: "Influenced",
  CREATED_BY: "Created by",
  REFERENCES: "References",
  COMPETES_WITH: "Competes with",
  FORKED_FROM: "Forked from",
  PRECEDED_BY: "Preceded by",
  SUCCEEDED_BY: "Succeeded by",
  AUTHORED: "Authored",
  EMPLOYED: "Employed at",
  FUNDED: "Funded by",
  PUBLISHED: "Published",
};

export const edgeColors: Record<EdgeType, string> = {
  INSPIRED_BY: "#4F8CFF",
  INFLUENCED: "#8B5CF6",
  CREATED_BY: "#22C55E",
  REFERENCES: "#F59E0B",
  COMPETES_WITH: "#EF4444",
  FORKED_FROM: "#06B6D4",
  PRECEDED_BY: "#6B7280",
  SUCCEEDED_BY: "#6B7280",
  AUTHORED: "#8B5CF6",
  EMPLOYED: "#22C55E",
  FUNDED: "#F59E0B",
  PUBLISHED: "#EC4899",
};

/* ── Knowledge Layers ── */
export type KnowledgeLayer =
  | "research"
  | "industry"
  | "people"
  | "patents"
  | "open-source"
  | "funding"
  | "education"
  | "datasets";

export const knowledgeLayers: { id: KnowledgeLayer; label: string; icon: string; color: string }[] = [
  { id: "research", label: "Research", icon: "book-open", color: "#4F8CFF" },
  { id: "industry", label: "Industry", icon: "building-2", color: "#22C55E" },
  { id: "people", label: "People", icon: "users", color: "#8B5CF6" },
  { id: "patents", label: "Patents", icon: "shield-check", color: "#06B6D4" },
  { id: "open-source", label: "Open Source", icon: "git-branch", color: "#F59E0B" },
  { id: "funding", label: "Funding", icon: "banknote", color: "#EC4899" },
  { id: "education", label: "Education", icon: "graduation-cap", color: "#F97316" },
  { id: "datasets", label: "Datasets", icon: "database", color: "#14B8A6" },
];

/* ── API ── */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
