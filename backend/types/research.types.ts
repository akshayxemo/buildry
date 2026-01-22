export interface ResearchInput {
  problemStatement: string;
  geography?: string;
}

export interface ResearchOutput {
  overview: string;
  affectedUsers: string[];
  statistics: {
    stat: string;
    source: string;
  }[];
  constraints: string[];
}