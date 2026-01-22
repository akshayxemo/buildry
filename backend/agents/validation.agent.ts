import { BaseAgent } from "./base.agent.js";
import { runLLM } from "../llm/ollama.client.js";
import type { ResearchOutput } from "../types/research.types.js";
import type { ValidationOutput } from "../types/validation.types.js";

export class ValidationAgent extends BaseAgent<
  ResearchOutput,
  ValidationOutput
> {
  name = "ValidationAgent";

  async run(research: ResearchOutput): Promise<ValidationOutput> {
    const prompt = `
        Return ONLY valid JSON.

        You are a startup validation expert.

        Validate the following research:

        ${JSON.stringify(research, null, 2)}

        Rules:
        - Be critical
        - No motivational language
        - Base conclusions only on given data

        JSON format:
        {
        "isProblemWorthSolving": true,
        "reasoning": "string",
        "targetUsers": ["string"],
        "risks": ["string"],
        "recommendation": "PROCEED | REFINE | DROP"
        }
    `;

    const response = await runLLM(prompt);
    return JSON.parse(response);
  }
}
