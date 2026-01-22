import { ResearchAgent } from "../agents/research.agent.js";
import { ValidationAgent } from "../agents/validation.agent.js";

export class IdeaPipeline {
  private researchAgent = new ResearchAgent();
  private validationAgent = new ValidationAgent();

  async run(input: {
    problemStatement: string;
    geography?: string;
  }) {
    // Step 1: Research
    const researchResult = await this.researchAgent.run({
      problemStatement: input.problemStatement,
      geography: input.geography,
    });

    // Step 2: Validation
    const validationResult =
      await this.validationAgent.run(researchResult);

    return {
      research: researchResult,
      validation: validationResult,
    };
  }
}