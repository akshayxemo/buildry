// import type { ResearchOutput } from "./research.types.js";

export interface ValidationOutput {
  isProblemWorthSolving: boolean;
  reasoning: string;
  targetUsers: string[];
  risks: string[];
  recommendation: "PROCEED" | "REFINE" | "DROP";
}