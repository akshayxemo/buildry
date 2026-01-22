export interface ResearchInput {
  problemStatement: string;
  geography?: string | undefined;
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