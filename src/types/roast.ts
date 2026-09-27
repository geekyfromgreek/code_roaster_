export type RoastLevel = "halka" | "tikha" | "zanzanit";

export type Persona = "standup" | "sharma_ji" | "professor" | "hostel_bhau" | "recruiter";

export interface IssueItem {
  lines: string;
  category: "LOGIC" | "PERFORMANCE" | "STYLE" | "SECURITY" | "SYNTAX";
  severity: "HIGH" | "MEDIUM" | "LOW";
  roast: string;
  fix: string;
}

export interface RoastResult {
  headline: string;
  score: number;
  scoreLabel: string;
  spiceVerdict: string;
  issues: IssueItem[];
  errorExplanation: string | null;
  correctedCode: string;
  encouragement: string;
  isFallback?: boolean;
}

export type ViewState = "idle" | "analyzing" | "result" | "error";
