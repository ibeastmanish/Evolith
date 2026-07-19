/* ========================================
   ANTI GRAVITY — DESIGN CONSTANTS
   ======================================== */

export const colors = {
  primary: "#0B1020",
  accent: "#7C5CFF",
  accentHover: "#9B7FFF",
  highlight: "#2DE2E6",
  highlightHover: "#5AEBEE",
  background: "#05070D",
  surface: "#0D1117",
  surfaceElevated: "#161B22",
  surfaceHover: "#1C2333",
  border: "rgba(168, 178, 209, 0.08)",
  borderHover: "rgba(168, 178, 209, 0.15)",
  textPrimary: "#FFFFFF",
  textSecondary: "#A8B2D1",
  textTertiary: "#6B7394",
  textMuted: "#4A5170",

  // Semantic
  research: "#5B8DEF",
  discovery: "#7C5CFF",
  verified: "#2DE2E6",
  unverified: "#F59E0B",
  contradicted: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
} as const;

export const ontologyColors: Record<string, string> = {
  theory: "#7C5CFF",
  law: "#5B8DEF",
  principle: "#818CF8",
  equation: "#2DE2E6",
  variable: "#67E8F9",
  dimension: "#A5B4FC",
  particle: "#F472B6",
  field: "#C084FC",
  interaction: "#FB923C",
  experiment: "#10B981",
  observable: "#34D399",
  dataset: "#FCD34D",
  institution: "#6B7394",
  researcher: "#A78BFA",
  citation: "#F59E0B",
  phenomenon: "#F97316",
  constant: "#EC4899",
  symmetry: "#8B5CF6",
  prediction: "#06B6D4",
} as const;

export const ontologyLabels: Record<string, string> = {
  theory: "Theory",
  law: "Law",
  principle: "Principle",
  equation: "Equation",
  variable: "Variable",
  dimension: "Dimension",
  particle: "Particle",
  field: "Field",
  interaction: "Interaction",
  experiment: "Experiment",
  observable: "Observable",
  dataset: "Dataset",
  institution: "Institution",
  researcher: "Researcher",
  citation: "Citation",
  phenomenon: "Phenomenon",
  constant: "Constant",
  symmetry: "Symmetry",
  prediction: "Prediction",
} as const;

export const edgeTypes = [
  "DERIVES_FROM",
  "PREDICTS",
  "CONTRADICTS",
  "SUPPORTS",
  "OBSERVES",
  "AUTHORED_BY",
  "CONDUCTED_AT",
  "MEASURES",
  "UNIFIES",
  "BREAKS",
  "GENERALIZES",
  "APPROXIMATES",
  "CONSTRAINS",
  "FALSIFIES",
] as const;

export const discoveryScoreMetrics = [
  { key: "novelty", label: "Novelty", description: "How original is this hypothesis?" },
  { key: "impact", label: "Impact", description: "Potential significance if true" },
  { key: "evidence", label: "Evidence", description: "How much supporting evidence exists?" },
  { key: "risk", label: "Risk", description: "Likelihood of being wrong" },
  { key: "confidence", label: "Confidence", description: "AI confidence in the reasoning" },
  { key: "testability", label: "Testability", description: "Can this be experimentally verified?" },
  { key: "consistency", label: "Consistency", description: "Does it align with established physics?" },
  { key: "researchGap", label: "Research Gap", description: "How underexplored is this area?" },
  { key: "citationCoverage", label: "Citation Coverage", description: "How well-cited is the literature?" },
] as const;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const SITE_CONFIG = {
  name: "Anti Gravity",
  tagline: "Where AI Meets Fundamental Physics",
  description: "An open research platform connecting the mathematics behind the universe.",
  github: "https://github.com/ibeastmanish/Evolith",
} as const;
